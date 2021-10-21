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

test('tagname check with or without "v"', async (t) => {
    const dut = new MarkdownContents()
    dut.getLatestReleaseNotes = async () => {
        return {
            tag_name: 'v1.0',
            body: ''
        }
    }
    const actual = await dut.markdownContentsFromPinpointLatestReleaseNotes()
    t.true(/# What's New in v1.0/.test(actual), '`# What"s New in tagname with "v"')
    t.end()
})