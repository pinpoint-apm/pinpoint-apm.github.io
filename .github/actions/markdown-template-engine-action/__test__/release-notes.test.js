/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const test = require('tape')
const MarkdownContents = require('../lib/markdown-contents')

test('release notes', async (t) => {
    const dut = new MarkdownContents()
    const actual = await dut.markdownContentsFromPinpointLatestReleaseNotes()
    t.true(/# What's New in/.test(actual), '`# What"s New in tagname` match error')
    t.end()
})