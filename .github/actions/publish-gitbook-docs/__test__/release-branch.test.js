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
const releaseNotes = 'What\'s New in v3.1.1'

async function commitWithDate(git, dir, file, content, message, date) {
    await fs.outputFile(path.join(dir, file), content)
    await git.add(file)
    await simpleGit({ baseDir: dir }).env({ PATH: process.env.PATH, HOME: process.env.HOME, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date }).commit(message)
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
        releaseNotes: await commitWithDate(git, dir, 'main.md', releaseNotes, releaseNotesCommitMessage, '2026-10-28T02:46:08Z')
    }
    return { root, origin: simpleGit({ baseDir: origin }), git, commits }
}

test('late workflow run branches from the last docs commit before the Pinpoint release', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()

    const releaseBranchCommit = await new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAt).create('./main.md', releaseNotes, releaseNotesCommitMessage, 'HEAD^')

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

    const releaseBranchCommit = await new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAfterAllDocs).create('main.md', releaseNotes, releaseNotesCommitMessage, 'HEAD^')

    t.equal((await origin.revparse(['v3.1.1^'])).trim(), commits.docsAfterPinpointRelease, 'release notes commit is on top of the last docs commit')
    const pinpointReleaseEpochSeconds = Date.parse(pinpointReleasePublishedAfterAllDocs) / 1000
    t.equal((await origin.raw(['log', '-1', '--format=%at %ct', 'v3.1.1'])).trim(), `${pinpointReleaseEpochSeconds} ${pinpointReleaseEpochSeconds}`, 'release notes commit is dated at the Pinpoint release published_at, not the run day')
    t.equal((await git.raw(['diff', '--name-only', commits.releaseNotes, releaseBranchCommit])).trim(), '', 'same content as the release notes commit on main')
    await fs.remove(root)
    t.end()
})

test('workflow run without the Pinpoint release published_at branches from HEAD', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()

    await new ReleaseBranch(git, 'v3.1.1').create('main.md', releaseNotes, releaseNotesCommitMessage, 'HEAD^')

    t.equal((await origin.revparse(['v3.1.1'])).trim(), commits.releaseNotes, 'branch is the release notes commit')
    await fs.remove(root)
    t.end()
})

test('late workflow run on a detached HEAD keeps the detached work tree', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()
    await git.checkout([commits.releaseNotes])

    await new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAt).create('main.md', releaseNotes, releaseNotesCommitMessage, 'HEAD^')

    t.equal((await origin.revparse(['v3.1.1^'])).trim(), commits.docsBeforePinpointRelease, 'release notes commit is on top of the last docs commit before the Pinpoint release')
    t.equal((await git.revparse(['HEAD'])).trim(), commits.releaseNotes, 'HEAD stays at the release notes commit')
    await fs.remove(root)
    t.end()
})

test('patch release of an older line branches from the docs history without a release notes commit on main', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()
    const olderLineReleaseNotes = 'What\'s New in v3.0.6'

    const releaseBranchCommit = await new ReleaseBranch(git, 'v3.0.6', '2026-10-15T00:00:00Z').create('main.md', olderLineReleaseNotes, '3.0.6 release', 'HEAD')

    t.equal((await origin.revparse(['v3.0.6^'])).trim(), commits.docsAfterPinpointRelease, 'on top of the last docs commit before the 3.0.6 release')
    t.equal((await origin.show([`${releaseBranchCommit}:main.md`])).trim(), olderLineReleaseNotes, 'main.md is the rendered 3.0.6 release notes')
    t.equal((await git.revparse(['HEAD'])).trim(), commits.releaseNotes, 'main is unchanged')
    await fs.remove(root)
    t.end()
})

test('existing release branch gets the edited release notes on its tip', async (t) => {
    const { root, origin, git, commits } = await makeDocsRepositoryWithLateReleaseNotesCommit()
    const releaseBranch = new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAt)
    const created = await releaseBranch.create('main.md', releaseNotes, releaseNotesCommitMessage, 'HEAD^')
    const editedReleaseNotes = 'What\'s New in v3.1.1\n\nedited'

    t.equal(await releaseBranch.exists(), true, 'branch exists on origin')
    const updated = await releaseBranch.update('main.md', editedReleaseNotes, releaseNotesCommitMessage)

    t.equal((await origin.revparse(['v3.1.1'])).trim(), updated, 'pushed branch is the returned commit')
    t.equal((await origin.revparse(['v3.1.1^'])).trim(), created, 'edit is on top of the previous branch tip')
    t.equal((await origin.show([`${updated}:main.md`])).trim(), editedReleaseNotes, 'main.md is the edited release notes')
    t.deepEqual((await origin.diffSummary([created, updated])).files.map(file => file.file), ['main.md'], 'only main.md changed')
    t.ok(Date.parse(pinpointReleasePublishedAt) / 1000 < Number((await origin.raw(['log', '-1', '--format=%ct', 'v3.1.1'])).trim()), 'edit is dated now, not at the Pinpoint release')
    t.equal((await git.revparse(['HEAD'])).trim(), commits.releaseNotes, 'main is unchanged')
    t.equal((await git.status()).isClean(), true, 'work tree and index are unchanged')
    await fs.remove(root)
    t.end()
})

test('existing release branch with the same release notes is left alone', async (t) => {
    const { root, origin, git } = await makeDocsRepositoryWithLateReleaseNotesCommit()
    const releaseBranch = new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAt)
    const created = await releaseBranch.create('main.md', releaseNotes, releaseNotesCommitMessage, 'HEAD^')

    const updated = await releaseBranch.update('main.md', releaseNotes, releaseNotesCommitMessage)

    t.equal(updated, undefined, 'no new commit')
    t.equal((await origin.revparse(['v3.1.1'])).trim(), created, 'branch tip is unchanged')
    await fs.remove(root)
    t.end()
})

test('missing release branch does not exist', async (t) => {
    const { root, git } = await makeDocsRepositoryWithLateReleaseNotesCommit()

    t.equal(await new ReleaseBranch(git, 'v3.1.1', pinpointReleasePublishedAt).exists(), false)
    await fs.remove(root)
    t.end()
})
