/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const test = require('tape')
const MarkdownContents = require('../lib/markdown-contents')
const TemplateEngine = require('../lib/template-engine')

const actualMD = `
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

MarkdownContents.setPinpointReadmeGithubPath('feelform/pinpoint')

test('tempalte engine', async (t) => {
    const dut = new TemplateEngine(actualMD)
    const actual = await dut.markdownContent({
        getTagName: function () {
            return 'v1.0'
        },
        getBody: function () {
            return ''
        }
    })
    t.true(/<!-- <compatibilityHbase\.md> -->/.test(actual), 'compatibilityHbase.md matches')
    t.end()
})

test('markdown section test', async (t) => {
    const dut = new TemplateEngine(actualMD)
    const actual = await dut.markdownContent({
        getTagName: function () {
            return 'v1.0'
        },
        getBody: function () {
            return ''
        }
    })
    t.true(/<!-- <compatibilityHbase\.md> -->/.test(actual), 'compatibilityHbase.md matches')
    t.end()
})

test('markdown from pinpoint index', async (t) => {
    const dut = new TemplateEngine(actualMD)
    const actual = await dut.markdownContent({
        getTagName: function () {
            return 'v1.0'
        },
        getBody: function () {
            return ''
        }
    })
    t.true(/<!-- <compatibilityHbase\.md> -->/.test(actual), 'compatibilityHbase.md matches')
    t.true(/<!-- <compatibilityJava\.md> -->/.test(actual), 'compatibilityJava.md matches')
    t.true(/<!-- <compatibilityPinpoint\.md> -->/.test(actual), 'compatibilityPinpoint.md matches')
    t.true(/<!-- <modules\.md> -->/.test(actual), 'modules.md matches')
    t.end()
})

const body = `
## Notice
We have moved our documentation to Gitbook.
https://pinpoint-apm.gitbook.io/pinpoint

<br><br>

## Experimental Features
How to enable the experimental function
![8c272f00-4175-11ec-8c2b-488815d51670](https://user-images.githubusercontent.com/10057874/141051187-7cb6fba8-c28e-4d24-aa27-c96630c1065e.gif)
<br>

### ServerMap realtime mode (#6980)
![servermap](https://user-images.githubusercontent.com/10057874/141051235-e31c3221-568c-4ac3-b0f8-26744ee17257.gif)
<br>

### Scatter chart heatmap mode (#8218)
with data sampling, better memory usage, better performance, and more intuitive visualization
<img width="457" alt="heatmap" src="https://user-images.githubusercontent.com/10057874/141051277-0571fcc5-54ff-4c4f-a5d8-9bcbab506126.png">

<br><br>

## Key Features
###  New Timeline (#7664) 
To provide more features via appling perfetto(https://ui.perfetto.dev/).
![timeline](https://user-images.githubusercontent.com/10057874/141051729-a8483a09-3dae-4bc0-8a14-b4dffbde63d3.jpeg)
<br>
###  Support webhook menus (#8132)
Please refer to pinpoint [gitbook](https://pinpoint-apm.gitbook.io/pinpoint/documents/alarm)
![webhook2](https://user-images.githubusercontent.com/10057874/141051986-102d90cd-a6f3-4f3f-863b-757e4b0d59fb.gif)
<br>
### Support percent sampler (#6617)
(Thank you @yjqg6666 for your contribution)
* pinpoint.config

# support 2 types, COUNTING(default) and PERCENT.
# If this value set to COUNTING(default), sampling rate is 1/n.
# If this value set to PERCENT, sampling rate is n%.
profiler.sampling.type=PERCENT

# if it's PERCENT, then first x transactions out of y transactions will be sampled.
# Support from 100% to 0.01%
# eg. 100: 100%    50: 50%    0.01: 0.01%
profiler.sampling.percent.sampling-rate=100

<br>

### Support TLS (#8128)
Support TLS Connection for agent and collector 
<br>

### Add user proxy plugin(#8122)
![user-proxy](https://user-images.githubusercontent.com/10057874/141052463-adb9b129-2571-4185-9730-d3b99d3304b0.png)

<br><br>

## Release Notes
### Plugins
* [Plugins issues](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+is%3Aclosed+label%3Amodule%3Aplugin+milestone%3A2.3.1)

### Enhancements
* [Agent](https://github.com/naver/pinpoint/issues?q=is%3Aissue+label%3Aenhancement+milestone%3A2.3.1+is%3Aclosed+label%3Amodule%3Aagent)

* [Plugin](https://github.com/naver/pinpoint/issues?q=is%3Aissue+label%3Aenhancement+milestone%3A2.3.1+is%3Aclosed+label%3Amodule%3Aplugin)

* [Collector](https://github.com/naver/pinpoint/issues?q=is%3Aissue+label%3Aenhancement+milestone%3A2.3.1+is%3Aclosed+label%3Amodule%3Acollector)

* [Web](https://github.com/naver/pinpoint/issues?q=is%3Aissue+label%3Aenhancement+milestone%3A2.3.1+is%3Aclosed+label%3Amodule%3Aweb)

* [Batch](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Aenhancement+label%3Amodule%3Abatch)

* [Flink](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Aenhancement+label%3Amodule%3Aflink)

* [Common](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Aenhancement+label%3Amodule%3Aproject-common)

* [Test](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Aenhancement+label%3Amodule%3Atest)

### Bugs
* [Agent](https://github.com/naver/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Abug+label%3Amodule%3Aagent)

* [Plugin](https://github.com/naver/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Abug+label%3Amodule%3Aplugin)

* [Collector](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Abug+label%3Amodule%3Acollector)

* [Web](https://github.com/naver/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+label%3Abug+is%3Aclosed+label%3Amodule%3Aweb)

* [Test](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Abug+label%3Amodule%3Atest)

### Configuration
* [Agent](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Aconfiguration+label%3Amodule%3Aagent)

* [Collector](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Aconfiguration+label%3Amodule%3Acollector)

* [Web](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Aconfiguration+label%3Amodule%3Aweb)

* [Common](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Aconfiguration+label%3Amodule%3Aproject-common)

### Cleanup
* [Agent](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Acleanup+label%3Amodule%3Aagent)

### Dependency
* [All](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.1+is%3Aclosed+label%3Adependencies)

<br><br>

## Thank You
to
whom provided or suggested valuable features
whom fixed or reported bugs
whom showed interest in Pinpoint and shared it to others.

Thank you all.
If there is someone who was inadvertently excluded, please let me know.
@aalinyu
@Duytq7
@mariusssi
@yjqg6666
`

test('markdown releasenotes gitbook image block style', async (t) => {
    const dut = new TemplateEngine(actualMD)
    const actual = await dut.markdownContent({
        getTagName: function () {
            return 'v1.0'
        },
        getBody: function () {
            return body
        }
    })
    t.true(/<!-- <compatibilityHbase\.md> -->/.test(actual), 'compatibilityHbase.md matches')
    t.true(/<!-- <compatibilityJava\.md> -->/.test(actual), 'compatibilityJava.md matches')
    t.true(/<!-- <compatibilityPinpoint\.md> -->/.test(actual), 'compatibilityPinpoint.md matches')
    t.true(/<!-- <modules\.md> -->/.test(actual), 'modules.md matches')
    t.end()
})