/**
 * Pinpoint GitBook docs publisher
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const test = require('tape')
const PinpointRelease = require('../lib/pinpoint-release')

const release400 = {
    id: 426431295,
    name: '4.0.0',
    body: 'Pinpoint 4.0.0 is a **major release**',
    tag_name: 'v4.0.0',
    html_url: 'https://github.com/pinpoint-apm/pinpoint/releases/tag/v4.0.0',
    published_at: '2026-10-28T08:47:38Z'
}

function fakeGithubApi(responses) {
    const urls = []
    const fetchJson = async (url) => {
        urls.push(url)
        if (!(url in responses)) {
            throw new Error(`unexpected ${url}`)
        }
        return responses[url]
    }
    return { fetchJson, urls }
}

test('fetchById takes the release by its id and the author from the publishing user', async (t) => {
    const api = fakeGithubApi({
        'https://api.github.com/users/feelform': { name: 'Yongseok' },
        'https://api.github.com/repos/pinpoint-apm/pinpoint/releases/426431295': release400
    })

    const release = await PinpointRelease.fetchById(426431295, 'feelform', api.fetchJson)

    t.equal(release.getName(), '4.0.0')
    t.equal(release.getBody(), 'Pinpoint 4.0.0 is a **major release**')
    t.equal(release.getTagName(), 'v4.0.0')
    t.equal(release.getVersion(), 'v4.0.0')
    t.equal(release.getPublishedAt(), '2026-10-28T08:47:38Z')
    t.equal(release.commitLog(), '4.0.0 tag: v4.0.0 https://github.com/pinpoint-apm/pinpoint/releases/tag/v4.0.0')
    t.equal(release.getAuthorName(), 'Yongseok')
    t.equal(release.getAuthorEmail(), 'feelform@users.noreply.github.com')
    t.end()
})

test('fetchLatest takes the latest Pinpoint release with the bot author', async (t) => {
    const api = fakeGithubApi({
        'https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest': release400
    })

    const release = await PinpointRelease.fetchLatest(api.fetchJson)

    t.equal(release.getVersion(), 'v4.0.0')
    t.equal(release.commitLog(), '4.0.0 tag: v4.0.0 https://github.com/pinpoint-apm/pinpoint/releases/tag/v4.0.0')
    t.equal(release.getAuthorName(), 'github-actions[bot]')
    t.equal(release.getAuthorEmail(), '41898282+github-actions[bot]@users.noreply.github.com')
    t.end()
})

test('fetchByTag takes the release of a docs version with the bot author', async (t) => {
    const api = fakeGithubApi({
        'https://api.github.com/repos/pinpoint-apm/pinpoint/releases/tags/v4.0.0': release400
    })

    const release = await PinpointRelease.fetchByTag('v4.0.0', api.fetchJson)

    t.equal(release.getVersion(), 'v4.0.0')
    t.equal(release.getPublishedAt(), '2026-10-28T08:47:38Z')
    t.equal(release.getAuthorName(), 'github-actions[bot]')
    t.end()
})

test('a release at or above the What\'s New version on main is the latest version', async (t) => {
    const release = await PinpointRelease.fetchLatest(async () => ({ ...release400, tag_name: 'v3.1.2' }))

    t.equal(release.isLatestVersion('v3.1.1'), true, 'newer than the What\'s New page')
    t.equal(release.isLatestVersion('v3.1.2'), true, 'same as the What\'s New page: edited release notes')
    t.equal(release.isLatestVersion('v4.0.0'), false, '3.1.2 after 4.0.0 is a patch of an older line')
    t.equal(release.isLatestVersion(undefined), true, 'What\'s New page without a version')
    t.end()
})
