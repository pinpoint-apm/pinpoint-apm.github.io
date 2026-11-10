/**
 * Pinpoint GitBook docs publisher
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const fs = require('fs')
const path = require('path')

const fixtureFiles = {
    'https://raw.githubusercontent.com/pinpoint-apm/pinpoint/master/README.md': 'pinpoint-readme.md',
    'https://raw.githubusercontent.com/pinpoint-apm/pinpoint/master/doc/modules.md': 'pinpoint-doc-modules.md'
}

async function fetchFixtureText(url) {
    if (!(url in fixtureFiles)) {
        throw new Error(`unexpected ${url}`)
    }
    return fs.promises.readFile(path.join(__dirname, 'fixtures', fixtureFiles[url]), 'utf8')
}

module.exports = { fetchFixtureText }
