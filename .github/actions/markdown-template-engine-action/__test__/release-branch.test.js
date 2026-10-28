/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const test = require('tape')
const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const simpleGit = require('simple-git')
const ReleaseBranch = require('../lib/release-branch')

const pinpointReleasePublishedAt = '2026-10-02T06:04:27Z'
const releaseNotesCommitMessage = '3.1.1 release tag: 3.1.1 https://api.github.com/repos/pinpoint-apm/pinpoint/releases/401555453'

async function commitWithDate(git, dir, file, content, message, date) {
    await fs.outputFile(path.join(dir, file), content)
    await git.add(file)
    await git.env({ ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date }).commit(message)
    git.env(process.env)
    return (await git.revparse(['HEAD'])).trim()
}

async function makeDocsRepositoryWithLateReleaseNotesCommit() {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'release-branch-'))
    const origin = path.join(root, 'origin.git')
    const dir = path.join(root, 'work')
    await simpleGit().init(['--bare', origin])
    await fs.mkdirp(dir)
    const git = simpleGit({ baseDir: dir })
    await git.init(['-b', 'main'])
    await git.addConfig('user.name', 'test').addConfig('user.email', 'test@example.com')
    await git.addRemote('origin', origin)

    const commits = {
        docsBeforePinpointRelease: await commitWithDate(git, dir, 'service.md', 'service', 'Add Service documentation', '2026-10-01T05:35:41Z'),
        docsAfterPinpointRelease: await commitWithDate(git, dir, 'alarm.md', 'alarm', 'Add Service Alarm guide', '2026-10-12T09:46:56Z'),
        releaseNotes: await commitWithDate(git, dir, 'main.md', 'What\'s New in v3.1.1', releaseNotesCommitMessage, '2026-10-28T02:46:08Z')
    }
    return { root, origin: simpleGit({ baseDir: origin }), git, commits }
}

test('late workflow run branches from the last docs commit before the Pinpoint release', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()

    const releaseBranchCommit = await new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAt).create('./main.md', releaseNotesCommitMessage)

    t.equal((await origin.revparse(['v3.1.1'])).trim(), releaseBranchCommit, 'pushed branch is the returned commit')
    t.equal((await origin.revparse(['v3.1.1^'])).trim(), commits.docsBeforePinpointRelease, 'release notes commit is on top of the last docs commit before the Pinpoint release')
    t.deepEqual((await origin.diffSummary([commits.docsBeforePinpointRelease, 'v3.1.1'])).files.map(file => file.file), ['main.md'], 'only main.md is added')
    t.equal((await origin.raw(['log', '-1', '--format=%s', 'v3.1.1'])).trim(), releaseNotesCommitMessage, 'release notes commit message is kept')
    const pinpointReleaseEpochSeconds = Date.parse(pinpointReleasePublishedAt) / 1000
    t.equal((await origin.raw(['log', '-1', '--format=%at %ct', 'v3.1.1'])).trim(), `${pinpointReleaseEpochSeconds} ${pinpointReleaseEpochSeconds}`, 'release notes commit is dated at the Pinpoint release published_at')
    t.equal((await git.revparse(['--abbrev-ref', 'HEAD'])).trim(), 'main', 'work tree stays on main')
    t.equal((await git.revparse(['HEAD'])).trim(), commits.releaseNotes, 'main is unchanged')
    t.equal((await git.status()).isClean(), true, 'work tree and index are unchanged')
    await fs.remove(root)
    t.end()
})

test('late workflow run without docs commits after the Pinpoint release dates the release notes commit at the Pinpoint release', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()
    const pinpointReleasePublishedAfterAllDocs = '2026-10-20T00:00:00Z'

    const releaseBranchCommit = await new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAfterAllDocs).create('main.md', releaseNotesCommitMessage)

    t.equal((await origin.revparse(['v3.1.1^'])).trim(), commits.docsAfterPinpointRelease, 'release notes commit is on top of the last docs commit')
    const pinpointReleaseEpochSeconds = Date.parse(pinpointReleasePublishedAfterAllDocs) / 1000
    t.equal((await origin.raw(['log', '-1', '--format=%at %ct', 'v3.1.1'])).trim(), `${pinpointReleaseEpochSeconds} ${pinpointReleaseEpochSeconds}`, 'release notes commit is dated at the Pinpoint release published_at, not the run day')
    t.equal((await git.raw(['diff', '--name-only', commits.releaseNotes, releaseBranchCommit])).trim(), '', 'same content as the release notes commit on main')
    await fs.remove(root)
    t.end()
})

test('workflow run without the Pinpoint release published_at branches from HEAD', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()

    await new ReleaseBranch(git, 'v3.1.1').create('main.md', releaseNotesCommitMessage)

    t.equal((await origin.revparse(['v3.1.1'])).trim(), commits.releaseNotes, 'branch is the release notes commit')
    await fs.remove(root)
    t.end()
})

test('late workflow run on a detached HEAD keeps the detached work tree', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()
    await git.checkout([commits.releaseNotes])

    await new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAt).create('main.md', releaseNotesCommitMessage)

    t.equal((await origin.revparse(['v3.1.1^'])).trim(), commits.docsBeforePinpointRelease, 'release notes commit is on top of the last docs commit before the Pinpoint release')
    t.equal((await git.revparse(['HEAD'])).trim(), commits.releaseNotes, 'HEAD stays at the release notes commit')
    await fs.remove(root)
    t.end()
})
