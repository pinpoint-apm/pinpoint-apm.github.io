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

test('index.js', (t) => {
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