/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const test = require('tape')
const MarkdownContents = require('../lib/markdown-contents')
const ReleaseNotes = require('../lib/release-notes')

test('tagname check with "v"', async (t) => {
    const actual = (await ReleaseNotes.makeLatestReleaseNotes({
        latest: function () {
            return {
                tag_name: 'v1.0',
                body: ''
            }
        }
    })).contents
    t.true(/# What's New in v1.0/.test(actual), '`# What"s New in tagname with "v"')
    t.end()
})

test('tagname check without "v"', async (t) => {
    const actual = (await ReleaseNotes.makeLatestReleaseNotes({
        latest: function () {
            return {
                tag_name: '1.0',
                body: ''
            }
        }
    })).contents
    t.true(/# What's New in v1.0/.test(actual), '`# What"s New in tagname without "v"')
    t.end()
})