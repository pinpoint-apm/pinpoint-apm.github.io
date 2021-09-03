/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const index = require('../index')
const process = require('process')
const cp = require('child_process')
const path = require('path')
const test = require('tape')

test('index.js', (t) => {
    process.env['INPUT_TEMPLATE_PAGE'] = ''
    console.log(process.env)
    const ip = path.join(__dirname, '../', 'index.js');
    console.log(cp.execSync(`node ${ip}`, { env: process.env }).toString());
    t.end()
})