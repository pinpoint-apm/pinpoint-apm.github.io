/**
 * Pinpoint GitBook versions action
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const test = require('tape')
const fs = require('fs')
const path = require('path')

const fixtures = path.join(__dirname, 'fixtures')

async function readFixture(name) {
    return JSON.parse(await fs.promises.readFile(path.join(fixtures, name), 'utf8'))
}

test('site-spaces list gives each version its site space id, title, path and space id', async (t) => {
    const { items } = await readFixture('site-spaces-list.json')

    t.ok(items.length > 0, 'items is a non-empty array')
    for (const siteSpace of items) {
        t.equal(typeof siteSpace.id, 'string', `${siteSpace.path} id`)
        t.equal(typeof siteSpace.title, 'string', `${siteSpace.path} title`)
        t.equal(typeof siteSpace.path, 'string', `${siteSpace.path} path`)
        t.equal(typeof siteSpace.default, 'boolean', `${siteSpace.path} default`)
        t.equal(typeof siteSpace.space.id, 'string', `${siteSpace.path} space.id`)
    }
    t.end()
})

test('site-spaces list marks latest-snapshot as the only default site space', async (t) => {
    const { items } = await readFixture('site-spaces-list.json')

    t.deepEqual(items.filter(siteSpace => siteSpace.default).map(siteSpace => siteSpace.path), ['latest-snapshot'])
    t.end()
})

test('site-spaces list gives the Git Sync branch url only for Git Synced versions', async (t) => {
    const { items } = await readFixture('site-spaces-list.json')
    const bySitePath = Object.fromEntries(items.map(siteSpace => [siteSpace.path, siteSpace]))

    t.equal(bySitePath['v3.0.4'].space.gitSync.url, 'https://github.com/pinpoint-apm/pinpoint-apm.github.io/tree/v3.0.4', 'Git Synced version')
    t.equal(bySitePath['v3.0.2'].space.gitSync, undefined, 'version without Git Sync')
    t.end()
})

test('site-spaces add gives the new site space id and the space id to import into', async (t) => {
    const siteSpace = await readFixture('site-spaces-add.json')

    t.equal(typeof siteSpace.id, 'string', 'id')
    t.equal(typeof siteSpace.path, 'string', 'path')
    t.equal(typeof siteSpace.space.id, 'string', 'space.id')
    t.end()
})

test('site-spaces add paths the new site space by its title, so no path update is needed', async (t) => {
    const siteSpace = await readFixture('site-spaces-add.json')

    t.equal(siteSpace.path, siteSpace.title)
    t.end()
})

test('organizations list gives each organization id', async (t) => {
    const { items } = await readFixture('organizations-list.json')

    t.ok(items.length > 0, 'items is a non-empty array')
    for (const organization of items) {
        t.equal(typeof organization.id, 'string', `${organization.title} id`)
    }
    t.end()
})

test('organizations sites list gives each site id and its published URL', async (t) => {
    const { items } = await readFixture('organizations-sites-list.json')

    t.ok(items.length > 0, 'items is a non-empty array')
    for (const site of items) {
        t.equal(typeof site.id, 'string', `${site.title} id`)
        t.equal(typeof site.urls.published, 'string', `${site.title} urls.published`)
    }
    t.end()
})
