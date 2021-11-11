/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const process = require('process')
const cp = require('child_process')
const path = require('path')
const test = require('tape')
const github = require('@actions/github')

test('index.js error case', (t) => {
    process.env['INPUT_TEMPLATE_MARKDOWN_FILE'] = ''
    const ip = path.join(__dirname, '../', 'index.js')

    t.throws(
        function badPath() {
            const node = cp.execSync(`node ${ip}`, { env: process.env }).toString()
        },
        /Error: Command failed: node .*/,
        'INPUT_TEMPLATE_MARKDOWN_FILE empty string test'
    )
    t.end()
})

test('index.js client payload test', (t) => {
    process.env['INPUT_TEMPLATE_MARKDOWN_FILE'] = './.github/actions/markdown-template-engine-action/__test__/main.test.md'
    process.env['INPUT_SECTION_GITHUB_PATH'] = 'feelform/pinpoint'
    process.env['INPUT_DISABLE_BRANCH'] = 'YES'
    process.env['INPUT_DISABLE_SYNC_CHANGES'] = 'YES'
    process.env['INPUT_CLIENT_PAYLOAD'] = JSON.stringify({
        "username": "feelform", "release": {
            "assets": [],
            "assets_url": "https://api.github.com/repos/feelform/pinpoint/releases/52568229/assets",
            "author": {
                "avatar_url": "https://avatars.githubusercontent.com/u/616895?v=4",
                "events_url": "https://api.github.com/users/feelform/events{/privacy}",
                "followers_url": "https://api.github.com/users/feelform/followers",
                "following_url": "https://api.github.com/users/feelform/following{/other_user}",
                "gists_url": "https://api.github.com/users/feelform/gists{/gist_id}",
                "gravatar_id": "",
                "html_url": "https://github.com/feelform",
                "id": 616895,
                "login": "feelform",
                "node_id": "MDQ6VXNlcjYxNjg5NQ==",
                "organizations_url": "https://api.github.com/users/feelform/orgs",
                "received_events_url": "https://api.github.com/users/feelform/received_events",
                "repos_url": "https://api.github.com/users/feelform/repos",
                "site_admin": false,
                "starred_url": "https://api.github.com/users/feelform/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/feelform/subscriptions",
                "type": "User",
                "url": "https://api.github.com/users/feelform"
            },
            "body": "v2.3.1 body",
            "created_at": "2021-11-03T04:46:43Z",
            "draft": false,
            "html_url": "https://github.com/feelform/pinpoint/releases/tag/v2.3.1",
            "id": 52568229,
            "name": "v2.3.1",
            "node_id": "RE_kwDODUkbus4DIiCl",
            "prerelease": false,
            "published_at": "2021-11-03T04:48:02Z",
            "tag_name": "v2.3.1",
            "tarball_url": "https://api.github.com/repos/feelform/pinpoint/tarball/v2.3.1",
            "target_commitish": "master",
            "upload_url": "https://uploads.github.com/repos/feelform/pinpoint/releases/52568229/assets{?name,label}",
            "url": "https://api.github.com/repos/feelform/pinpoint/releases/52568229",
            "zipball_url": "https://api.github.com/repos/feelform/pinpoint/zipball/v2.3.1"
        }
    })
    const ip = path.join(__dirname, '../', 'index.js')
    const node = cp.execSync(`node ${ip}`, { env: process.env }).toString()
    const regex = /name=markdown::<!--\s<latestReleaseNotes\.md>/gm
    const match = regex.exec(node)
    t.true(match.length > 0, 'match markdown')

    delete process.env['INPUT_CLIENT_PAYLOAD']
    t.end()
})

test('index.js schedule test', (t) => {
    process.env['INPUT_TEMPLATE_MARKDOWN_FILE'] = './.github/actions/markdown-template-engine-action/__test__/main.test.md'
    process.env['INPUT_SECTION_GITHUB_PATH'] = 'feelform/pinpoint'
    process.env['INPUT_DISABLE_BRANCH'] = 'YES'
    process.env['INPUT_DISABLE_SYNC_CHANGES'] = 'YES'
    const ip = path.join(__dirname, '../', 'index.js')
    const node = cp.execSync(`node ${ip}`, { env: process.env }).toString()
    const regex = /name=markdown::<!--\s<latestReleaseNotes\.md>/gm
    const match = regex.exec(node)
    t.true(match.length > 0, 'match markdown')
    t.end()
})