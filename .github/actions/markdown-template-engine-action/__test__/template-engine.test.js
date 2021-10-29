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

const readme = `## Compatibility

    Java version required to run Pinpoint:
    <!-- <compatibilityJava.md> -->
    Pinpoint Version | Agent | Collector | Web
    ---------------- | ----- | --------- | ---
    1.7.x  | 6-8  | 8   | 8
    1.8.0  | 6-10 | 8   | 8 
    1.8.1+ | 6-11 | 8   | 8 
    2.0.x  | 6-13 | 8   | 8
    2.1.x  | 6-14 | 8   | 8
    2.2.x  | 7-14 | 8   | 8
    2.3.x  | 7-17 | 8   | 8
    <!-- </compatibilityJava.md> -->
    HBase compatibility table:
    <!-- <compatibilityHbase.md> -->
    Pinpoint Version | HBase 1.0.x | HBase 1.2.x | HBase 1.4.x | HBase 2.0.x
    ---------------- | ----------- | ----------- | ----------- | -----------
    1.7.x | not tested | yes | yes | no
    1.8.x | not tested | yes | yes | no
    2.0.x | not tested | yes | yes | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint)
    2.1.x | not tested | yes | yes | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint)
    2.2.x | not tested | yes | yes | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint)
    2.3.x | not tested | yes | yes | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/master/hbase2-module)
    <!-- </compatibilityHbase.md> -->
    Agent - Collector compatibility table:
    <!-- <compatibilityPinpoint.md> -->
    Agent Version | Collector 1.7.x | Collector 1.8.x | Collector 2.0.x | Collector 2.1.x | Collector 2.2.x | Collector 2.3.x |
    ------------- | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- |
    1.7.x | yes | yes | yes | yes | yes | yes 
    1.8.x | no  | yes | yes | yes | yes | yes 
    2.0.x | no  | no  | yes | yes | yes | yes 
    2.1.x | no  | no  | no  | yes | yes | yes 
    2.2.x | no  | no  | no  | no  | yes | yes
    2.3.x | no  | no  | no  | no  | no  | yes
    <!-- </compatibilityPinpoint.md> -->
    Flink compatibility table:
    
    Pinpoint Version | flink 1.3.X | flink 1.4.X | flink 1.5.X | flink 1.6.X | flink 1.7.X
    ---------------- | ----------- | ----------- | ----------- | ----------- | ----------- 
    1.7.x | yes | yes | no | no | no |
    1.8.x | yes | yes | no | no | no |
    2.0.x | yes | yes | yes | yes | yes |
    2.1.x | yes | yes | yes | yes | yes |
    2.2.x | yes | yes | yes | yes | yes |
    2.3.x | yes | yes | yes | yes | yes |    
`

