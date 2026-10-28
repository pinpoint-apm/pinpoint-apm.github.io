/**
 * Pinpoint GitBook versions action
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const test = require('tape')
const fs = require('fs')
const path = require('path')
const os = require('os')
const GitbookVersions = require('../lib/gitbook-versions')

const fixtures = path.join(__dirname, 'fixtures')

async function readFixture(name) {
    return JSON.parse(await fs.promises.readFile(path.join(fixtures, name), 'utf8'))
}
const publishedSiteUrl = 'https://pinpoint-apm.gitbook.io/pinpoint/'
const docsBranches = ['v3.0.2', 'v3.0.3', 'v3.0.4', 'v3.1.0', 'v3.1.1']

function subcommandOf(gitbookArgs) {
    return gitbookArgs.slice(0, gitbookArgs.findIndex(arg => arg.startsWith('--'))).join(' ')
}

async function fakeGitbookSite() {
    const responses = {
        'organizations list': await readFixture('organizations-list.json'),
        'organizations sites list': await readFixture('organizations-sites-list.json'),
        'organizations sites site-spaces list': await readFixture('site-spaces-list.json')
    }
    const addedSiteSpaceTemplate = await readFixture('site-spaces-add.json')
    const calls = []

    async function runCommand(args, options) {
        calls.push({ args, options })
        if (args[0] === 'git') {
            const version = args[args.length - 1]
            return docsBranches.includes(version) ? `0123456789abcdef\trefs/heads/${version}\n` : ''
        }
        const subcommand = subcommandOf(args.slice(3))
        if (subcommand === 'organizations sites site-spaces add') {
            const { title } = JSON.parse(args[args.indexOf('--body') + 1])
            const id = title.replace(/\./g, '_')
            return JSON.stringify({ ...addedSiteSpaceTemplate, id: `sitesp_${id}`, title, path: title, space: { id: `space_${id}` } })
        }
        if (responses[subcommand]) {
            return JSON.stringify(responses[subcommand])
        }
        return ''
    }

    const gitbookCalls = () => calls.filter(call => call.args[0] === 'npx').map(call => call.args.slice(3))
    const writes = () => gitbookCalls().filter(args => ['organizations sites site-spaces add', 'organizations sites structure sort', 'spaces git import'].includes(subcommandOf(args)))
    const bodyOf = (args) => JSON.parse(args[args.indexOf('--body') + 1])
    return { runCommand, calls, gitbookCalls, writes, bodyOf }
}

test('new version is added, placed behind the next newer version and imported from its docs branch', async (t) => {
    const site = await fakeGitbookSite()

    const addedVersions = await new GitbookVersions(site.runCommand, publishedSiteUrl).add(['v3.0.3'])

    t.deepEqual(addedVersions, ['v3.0.3'])
    const [add, sort, gitImport] = site.writes()
    t.deepEqual(site.bodyOf(add), { spaceId: null, empty: true, title: 'v3.0.3' }, 'site space titled by the version')
    t.deepEqual(add.slice(-2), ['-org_pinpoint_apm', 'site_pinpoint'], 'added to the site found by its published URL')
    t.deepEqual(site.bodyOf(sort), { item: { type: 'site-space', id: 'sitesp_v3_0_3' }, position: { before: { type: 'site-space', id: 'sitesp_v3_0_4' } } }, 'placed behind v3.0.4')
    t.deepEqual(site.bodyOf(gitImport), { url: 'https://github.com/pinpoint-apm/pinpoint-apm.github.io.git', ref: 'refs/heads/v3.0.3' }, 'imported from the v3.0.3 branch')
    t.equal(gitImport[gitImport.length - 1], 'space_v3_0_3', 'imported into the new space')
    t.end()
})

test('newest version is placed behind the default site space', async (t) => {
    const site = await fakeGitbookSite()

    await new GitbookVersions(site.runCommand, publishedSiteUrl).add(['v3.1.1'])

    const [, sort] = site.writes()
    t.equal(site.bodyOf(sort).position.before.id, 'sitesp_latest_snapshot')
    t.end()
})

test('version already on the site is not changed', async (t) => {
    const site = await fakeGitbookSite()

    const addedVersions = await new GitbookVersions(site.runCommand, publishedSiteUrl).add(['v3.0.4'])

    t.deepEqual(addedVersions, [])
    t.deepEqual(site.writes(), [])
    t.end()
})

test('version without a docs branch is skipped', async (t) => {
    const site = await fakeGitbookSite()

    const addedVersions = await new GitbookVersions(site.runCommand, publishedSiteUrl).add(['v2.4.9'])

    t.deepEqual(addedVersions, [])
    t.deepEqual(site.writes(), [])
    t.end()
})

test('versions added in one run are placed against each other', async (t) => {
    const site = await fakeGitbookSite()

    const addedVersions = await new GitbookVersions(site.runCommand, publishedSiteUrl).add(['v3.1.1', 'v3.1.0'])

    t.deepEqual(addedVersions, ['v3.1.1', 'v3.1.0'])
    const sorts = site.writes().filter(args => subcommandOf(args) === 'organizations sites structure sort').map(args => site.bodyOf(args))
    t.deepEqual(sorts.map(sort => [sort.item.id, sort.position.before.id]), [['sitesp_v3_1_1', 'sitesp_latest_snapshot'], ['sitesp_v3_1_0', 'sitesp_v3_1_1']])
    t.end()
})

test('GitBook CLI runs outside the repository so npx does not resolve its packages', async (t) => {
    const site = await fakeGitbookSite()

    await new GitbookVersions(site.runCommand, publishedSiteUrl).add(['v3.0.3'])

    const gitbookOptions = site.calls.filter(call => call.args[0] === 'npx').map(call => call.options.cwd)
    t.ok(gitbookOptions.length > 0 && gitbookOptions.every(cwd => cwd === os.homedir()))
    t.deepEqual(site.calls[site.calls.length - 1].args.slice(0, 3), ['npx', '-y', '@gitbook/cli@0.32.10'])
    t.end()
})

test('no site published at the URL fails', async (t) => {
    const site = await fakeGitbookSite()

    try {
        await new GitbookVersions(site.runCommand, 'https://example.gitbook.io/other/').add(['v3.0.3'])
        t.fail('expected an error')
    } catch (error) {
        t.equal(error.message, 'No GitBook site is published at https://example.gitbook.io/other/')
    }
    t.deepEqual(site.writes(), [])
    t.end()
})

test('input that is not a vX.Y.Z version fails', async (t) => {
    const site = await fakeGitbookSite()

    try {
        await new GitbookVersions(site.runCommand, publishedSiteUrl).add(['3.0.3'])
        t.fail('expected an error')
    } catch (error) {
        t.equal(error.message, '3.0.3 is not a vX.Y.Z version')
    }
    t.end()
})

const latestPinpointReleaseIsNewer = async () => ({ tag_name: 'v3.2.0' })

test('manual run adds the versions input', async (t) => {
    const versions = await GitbookVersions.versionsToAdd(' v2.4.1  v2.4.2 ', { tag_name: 'v3.1.3' }, latestPinpointReleaseIsNewer)

    t.deepEqual(versions, ['v2.4.1', 'v2.4.2'])
    t.end()
})

test('release dispatch adds the dispatched release, even when a newer release exists', async (t) => {
    const versions = await GitbookVersions.versionsToAdd('', { tag_name: 'v3.1.3' }, latestPinpointReleaseIsNewer)

    t.deepEqual(versions, ['v3.1.3'])
    t.end()
})

test('manual run without the versions input adds the latest Pinpoint release', async (t) => {
    const versions = await GitbookVersions.versionsToAdd(undefined, undefined, latestPinpointReleaseIsNewer)

    t.deepEqual(versions, ['v3.2.0'])
    t.end()
})
