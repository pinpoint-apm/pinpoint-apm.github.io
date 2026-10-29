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

async function fakeGitbookSite({ ignoresSorts = false } = {}) {
    const responses = {
        'organizations list': await readFixture('organizations-list.json'),
        'organizations sites list': await readFixture('organizations-sites-list.json'),
        'organizations sites site-spaces list': await readFixture('site-spaces-list.json')
    }
    const addedSiteSpaceTemplate = await readFixture('site-spaces-add.json')
    const structure = await readFixture('structure-get.json')
    const calls = []

    function placeBehind({ item, position }) {
        const siteSpaces = structure.structure
        const moved = siteSpaces.splice(siteSpaces.findIndex(siteSpace => siteSpace.id === item.id), 1)[0]
        siteSpaces.splice(siteSpaces.findIndex(siteSpace => siteSpace.id === position.before.id) + 1, 0, moved)
    }

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
            const siteSpace = { ...addedSiteSpaceTemplate, id: `sitesp_${id}`, title, path: title, space: { id: `space_${id}` } }
            structure.structure.push(siteSpace)
            return JSON.stringify(siteSpace)
        }
        if (subcommand === 'organizations sites structure sort') {
            if (!ignoresSorts) {
                placeBehind(JSON.parse(args[args.indexOf('--body') + 1]))
            }
            return ''
        }
        if (subcommand === 'organizations sites structure get') {
            return JSON.stringify(structure)
        }
        if (responses[subcommand]) {
            return JSON.stringify(responses[subcommand])
        }
        return ''
    }

    const gitbookCalls = () => calls.filter(call => call.args[0] === 'npx').map(call => call.args.slice(3))
    const writes = () => gitbookCalls().filter(args => ['organizations sites site-spaces add', 'organizations sites structure sort', 'spaces git import'].includes(subcommandOf(args)))
    const bodyOf = (args) => JSON.parse(args[args.indexOf('--body') + 1])
    const sorts = () => writes().filter(args => subcommandOf(args) === 'organizations sites structure sort').map(args => bodyOf(args)).map(sort => [sort.item.id, sort.position.before.id])
    return { runCommand, calls, gitbookCalls, writes, bodyOf, sorts }
}

test('new version is added and imported from its docs branch', async (t) => {
    const site = await fakeGitbookSite()

    const { added, reimported } = await new GitbookVersions(site.runCommand, publishedSiteUrl).publish(['v3.0.3'])

    t.deepEqual(added, ['v3.0.3'])
    const [add, gitImport] = site.writes()
    t.deepEqual(site.bodyOf(add), { spaceId: null, empty: true, title: 'v3.0.3' }, 'site space titled by the version')
    t.deepEqual(add.slice(-2), ['-org_pinpoint_apm', 'site_pinpoint'], 'added to the site found by its published URL')
    t.deepEqual(site.bodyOf(gitImport), { url: 'https://github.com/pinpoint-apm/pinpoint-apm.github.io.git', ref: 'refs/heads/v3.0.3' }, 'imported from the v3.0.3 branch')
    t.equal(gitImport[gitImport.length - 1], 'space_v3_0_3', 'imported into the new space')
    t.end()
})

test('new version re-sorts every version behind the previous one, newest first after the default site space', async (t) => {
    const site = await fakeGitbookSite()

    await new GitbookVersions(site.runCommand, publishedSiteUrl).publish(['v3.0.3'])

    t.deepEqual(site.sorts(), [
        ['sitesp_v3_0_4', 'sitesp_latest_snapshot'],
        ['sitesp_v3_0_3', 'sitesp_v3_0_4'],
        ['sitesp_v3_0_2', 'sitesp_v3_0_3']
    ])
    t.end()
})

test('order on the site that differs from the wanted order after sorting fails with both orders', async (t) => {
    const site = await fakeGitbookSite({ ignoresSorts: true })

    try {
        await new GitbookVersions(site.runCommand, publishedSiteUrl).publish(['v3.0.3'])
        t.fail('expected an error')
    } catch (error) {
        t.equal(error.message, 'GitBook version order is latest-snapshot v3.0.4 v3.0.2 v3.0.3, expected latest-snapshot v3.0.4 v3.0.3 v3.0.2')
    }
    t.end()
})

test('version already on the site is imported again from its docs branch, without adding or sorting', async (t) => {
    const site = await fakeGitbookSite()

    const { added, reimported } = await new GitbookVersions(site.runCommand, publishedSiteUrl).publish(['v3.0.4'])

    t.deepEqual(added, [])
    t.deepEqual(reimported, ['v3.0.4'])
    const [gitImport] = site.writes()
    t.equal(site.writes().length, 1, 'only the import')
    t.deepEqual(site.bodyOf(gitImport), { url: 'https://github.com/pinpoint-apm/pinpoint-apm.github.io.git', ref: 'refs/heads/v3.0.4', force: true }, 'forced import replaces the content')
    t.equal(gitImport[gitImport.length - 1], 'space_v3_0_4', 'imported into the existing space')
    t.end()
})

test('version without a docs branch is skipped', async (t) => {
    const site = await fakeGitbookSite()

    const { added, reimported } = await new GitbookVersions(site.runCommand, publishedSiteUrl).publish(['v2.4.9'])

    t.deepEqual(added, [])
    t.deepEqual(reimported, [])
    t.deepEqual(site.writes(), [])
    t.end()
})

test('versions added in one run are sorted once, after all are added', async (t) => {
    const site = await fakeGitbookSite()

    const { added, reimported } = await new GitbookVersions(site.runCommand, publishedSiteUrl).publish(['v3.1.0', 'v3.1.1'])

    t.deepEqual(added, ['v3.1.0', 'v3.1.1'])
    t.deepEqual(site.writes().map(args => subcommandOf(args)).slice(0, 4), ['organizations sites site-spaces add', 'spaces git import', 'organizations sites site-spaces add', 'spaces git import'], 'adds and imports before sorting')
    t.deepEqual(site.sorts(), [
        ['sitesp_v3_1_1', 'sitesp_latest_snapshot'],
        ['sitesp_v3_1_0', 'sitesp_v3_1_1'],
        ['sitesp_v3_0_4', 'sitesp_v3_1_0'],
        ['sitesp_v3_0_2', 'sitesp_v3_0_4']
    ])
    t.end()
})

test('GitBook CLI runs outside the repository so npx does not resolve its packages', async (t) => {
    const site = await fakeGitbookSite()

    await new GitbookVersions(site.runCommand, publishedSiteUrl).publish(['v3.0.3'])

    const gitbookOptions = site.calls.filter(call => call.args[0] === 'npx').map(call => call.options.cwd)
    t.ok(gitbookOptions.length > 0 && gitbookOptions.every(cwd => cwd === os.homedir()))
    t.deepEqual(site.calls[site.calls.length - 1].args.slice(0, 3), ['npx', '-y', '@gitbook/cli@0.32.10'])
    t.end()
})

test('no site published at the URL fails', async (t) => {
    const site = await fakeGitbookSite()

    try {
        await new GitbookVersions(site.runCommand, 'https://example.gitbook.io/other/').publish(['v3.0.3'])
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
        await new GitbookVersions(site.runCommand, publishedSiteUrl).publish(['3.0.3'])
        t.fail('expected an error')
    } catch (error) {
        t.equal(error.message, '3.0.3 is not a vX.Y.Z version')
    }
    t.end()
})
