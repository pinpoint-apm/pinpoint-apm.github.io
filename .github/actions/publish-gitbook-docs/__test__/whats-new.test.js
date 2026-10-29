/**
 * Pinpoint GitBook docs publisher
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const test = require('tape')
const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const simpleGit = require('simple-git')
const WhatsNew = require('../lib/whats-new')
const PinpointRelease = require('../lib/pinpoint-release')

const whatsNewFile = './main.md'
const whatsNew311 = `<!-- <latestReleaseNotes.md> -->
# What's New in v3.1.1
Pinpoint 3.1.1
<!-- </latestReleaseNotes.md> -->
`

function pinpointRelease(release) {
    return PinpointRelease.fetchLatest(async () => release)
}

const release400 = {
    name: '4.0.0',
    body: 'Pinpoint 4.0.0 is a **major release**',
    tag_name: 'v4.0.0',
    html_url: 'https://github.com/pinpoint-apm/pinpoint/releases/tag/v4.0.0',
    published_at: '2026-10-28T08:47:38Z'
}

const release401 = { ...release400, name: '4.0.1', body: 'Pinpoint 4.0.1 patch', tag_name: 'v4.0.1', published_at: '2026-11-10T02:00:00Z' }

const release312 = {
    name: '3.1.2',
    body: 'Pinpoint 3.1.2 patch',
    tag_name: 'v3.1.2',
    html_url: 'https://github.com/pinpoint-apm/pinpoint/releases/tag/v3.1.2',
    published_at: '2026-11-03T02:00:00Z'
}

// Like a GitHub runner: no global git identity (HOME points at an empty directory), so every commit needs the identity the action sets
async function makeDocsRepository() {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'whats-new-'))
    const origin = path.join(root, 'origin.git')
    const dir = path.join(root, 'work')
    const home = process.env.HOME
    const cwd = process.cwd()
    process.env.HOME = root
    await simpleGit().init(['--bare', origin])
    await fs.mkdirp(dir)
    const git = simpleGit({ baseDir: dir })
    await git.init(['-b', 'main'])
    await git.addRemote('origin', origin)
    await fs.outputFile(path.join(dir, 'main.md'), whatsNew311)
    await git.add('main.md')
    await simpleGit({ baseDir: dir }).env({ PATH: process.env.PATH, HOME: root, GIT_AUTHOR_NAME: 'docs', GIT_AUTHOR_EMAIL: 'docs@example.com', GIT_COMMITTER_NAME: 'docs', GIT_COMMITTER_EMAIL: 'docs@example.com' }).commit('3.1.1 release')
    await git.push(['-u', 'origin', 'main'])
    process.chdir(dir)
    return {
        git,
        origin: simpleGit({ baseDir: origin }),
        main: (await git.revparse(['HEAD'])).trim(),
        cleanup: async () => {
            process.chdir(cwd)
            process.env.HOME = home
            await fs.remove(root)
        }
    }
}

test('latest release is committed to main and to its new docs branch', async (t) => {
    const repository = await makeDocsRepository()
    const release = await pinpointRelease(release400)

    const docsBranchMoved = await new WhatsNew(repository.git, whatsNewFile, whatsNew311).publish(release)

    t.equal(docsBranchMoved, true, 'docs branch is new')
    const mainWhatsNew = await repository.origin.show(['main:main.md'])
    t.ok(mainWhatsNew.includes('# What\'s New in v4.0.0'), 'main.md on main is the 4.0.0 release notes')
    t.ok(mainWhatsNew.includes(release400.body), 'main.md on main has the release body')
    t.equal((await repository.origin.raw(['log', '-1', '--format=%s %an', 'main'])).trim(), `${release.commitLog()} github-actions[bot]`, 'main commit message and author come from the release')
    t.equal(await repository.origin.show(['v4.0.0:main.md']), mainWhatsNew, 'docs branch v4.0.0 has the same main.md')
    t.equal((await repository.origin.revparse(['v4.0.0^'])).trim(), repository.main, 'docs branch starts from the docs before the release notes commit')
    await repository.cleanup()
    t.end()
})

test('patch release of an older line leaves main alone and gets its docs branch', async (t) => {
    const repository = await makeDocsRepository()
    const whatsNew400 = whatsNew311.replace('v3.1.1', 'v4.0.0')
    const release = await pinpointRelease(release312)

    const docsBranchMoved = await new WhatsNew(repository.git, whatsNewFile, whatsNew400).publish(release)

    t.equal(docsBranchMoved, true, 'docs branch is new')
    t.equal((await repository.origin.revparse(['main'])).trim(), repository.main, 'main is unchanged')
    t.ok((await repository.origin.show(['v3.1.2:main.md'])).includes('# What\'s New in v3.1.2'), 'docs branch v3.1.2 has the 3.1.2 release notes')
    t.equal((await repository.origin.revparse(['v3.1.2^'])).trim(), repository.main, 'docs branch starts from main')
    t.equal((await repository.origin.raw(['log', '-1', '--format=%an <%ae>', 'v3.1.2'])).trim(), 'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>', 'docs branch commit has the release author without a commit on main')
    t.equal((await repository.git.status()).isClean(), true, 'main.md on main is not touched')
    await repository.cleanup()
    t.end()
})

test('existing docs branch gets the edited release notes on its tip', async (t) => {
    const repository = await makeDocsRepository()
    const release = await pinpointRelease(release400)
    await new WhatsNew(repository.git, whatsNewFile, whatsNew311).publish(release)
    const first = (await repository.origin.revparse(['v4.0.0'])).trim()

    const edited = await pinpointRelease({ ...release400, body: 'Pinpoint 4.0.0 is a **major release** with edited notes' })
    const docsBranchMoved = await new WhatsNew(repository.git, whatsNewFile, await repository.origin.show(['main:main.md'])).publish(edited)

    t.equal(docsBranchMoved, true, 'docs branch moved')
    t.equal((await repository.origin.revparse(['v4.0.0^'])).trim(), first, 'edited notes commit is on top of the branch tip')
    t.ok((await repository.origin.show(['v4.0.0:main.md'])).includes('edited notes'), 'docs branch has the edited notes')
    t.ok((await repository.origin.show(['main:main.md'])).includes('edited notes'), 'main has the edited notes')
    await repository.cleanup()
    t.end()
})

test('unchanged release notes move nothing', async (t) => {
    const repository = await makeDocsRepository()
    const release = await pinpointRelease(release400)
    await new WhatsNew(repository.git, whatsNewFile, whatsNew311).publish(release)
    const main = (await repository.origin.revparse(['main'])).trim()
    const docsBranch = (await repository.origin.revparse(['v4.0.0'])).trim()

    const docsBranchMoved = await new WhatsNew(repository.git, whatsNewFile, await repository.origin.show(['main:main.md'])).publish(release)

    t.equal(docsBranchMoved, false, 'docs branch did not move')
    t.equal((await repository.origin.revparse(['main'])).trim(), main, 'main is unchanged')
    t.equal((await repository.origin.revparse(['v4.0.0'])).trim(), docsBranch, 'docs branch is unchanged')
    await repository.cleanup()
    t.end()
})

test('backfill of a newer then an older version keeps main at the newer one', async (t) => {
    const repository = await makeDocsRepository()
    const whatsNew = new WhatsNew(repository.git, whatsNewFile, whatsNew311)

    await whatsNew.publish(await pinpointRelease(release401))
    await whatsNew.publish(await pinpointRelease(release400))

    t.ok((await repository.origin.show(['main:main.md'])).includes('# What\'s New in v4.0.1'), 'main stays at 4.0.1')
    t.ok((await repository.origin.show(['v4.0.0:main.md'])).includes('# What\'s New in v4.0.0'), 'docs branch v4.0.0 has the 4.0.0 release notes')
    await repository.cleanup()
    t.end()
})

test('a release that is not a vX.Y.Z version is refused', async (t) => {
    const repository = await makeDocsRepository()
    const release = await pinpointRelease({ ...release400, tag_name: 'v2.4.0-RC1' })

    try {
        await new WhatsNew(repository.git, whatsNewFile, whatsNew311).publish(release)
        t.fail('publish must throw')
    } catch (error) {
        t.equal(error.message, 'v2.4.0-RC1 is not a vX.Y.Z version')
    }
    await repository.cleanup()
    t.end()
})
