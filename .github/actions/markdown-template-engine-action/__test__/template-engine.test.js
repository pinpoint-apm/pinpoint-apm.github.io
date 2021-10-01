/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const test = require('tape')
const TemplateEngine = require('../lib/template-engine')

const actualMD = `---
title: Pinpoint 2.2.2
keywords: 'pinpoint release, 2.2.2'
permalink: main.html
sidebar: mydoc_sidebar
---

<!-- <latestReleaseNotes.md> -->
<!-- </latestReleaseNotes.md> -->

## Upgrade consideration

HBase compatibility table:

<!-- <compatibilityHbase.md> -->
<!-- </compatibilityHbase.md> -->

Agent compatibility to Collector table:

<!-- <compatibilityPinpoint.md> -->
<!-- </compatibilityPinpoint.md> -->

Additionally, the required Java version to run each Pinpoint component is given below:

<!-- <compatibilityJava.md> -->
<!-- </compatibilityJava.md> -->
## Supported Modules

* JDK 6+
* Supported versions of the \* indicated library may differ from the actual version.

<!-- <modules.md> -->
<!-- </modules.md> -->`

test('tempalte engine', async (t) => {
    const dut = new TemplateEngine(actualMD)
    const actual = await dut.markdownContent()
    t.true(/<!-- <compatibilityHbase\.md> -->/.test(actual), 'compatibilityHbase.md matches')
    t.end()
})