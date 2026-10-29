/**
 * Pinpoint GitBook docs publisher
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const test = require('tape')
const Version = require('../lib/version')

test('vX.Y.Z versions compare by number, not by text', (t) => {
    t.ok(Version.parse('v4.0.0').compare(Version.parse('v3.1.2')) > 0)
    t.ok(Version.parse('v3.1.2').compare(Version.parse('v3.1.10')) < 0)
    t.equal(Version.parse('v3.1.1').compare(Version.parse('v3.1.1')), 0)
    t.end()
})

test('text that is not a vX.Y.Z version does not parse', (t) => {
    t.equal(Version.parse('3.1.1'), undefined)
    t.equal(Version.parse('latest-snapshot'), undefined)
    t.equal(Version.parse('v3.1'), undefined)
    t.end()
})
