/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const core = require('@actions/core')
const github = require('@actions/github')
const fs = require("fs-extra")
const axios = require('axios')
const MarkdownContents = require('./markdown-contents')
const ReleaseNotes = require('./release-notes')

class TemplateEngine {
    constructor(template) {
        this.template = template
    }

    async markdownContent(release) {
        let tagExpression = /<!--\s<(?!\/)(?<markdownfile>.*.md)>\s-->\n/gm
        let tag
        let result = this.template
        while ((tag = tagExpression.exec(this.template)) !== null) {
            const markdownFile = await this.markdownContentFromGithub(tag[1], release)
            result = result.replace(RegExp(`<!--\\s<${tag[1]}>\\s-->\\n[\\s\\S]*<!--\\s<\\/${tag[1]}>\\s-->`, 'm'), `<!-- <${tag[1]}> -->\n${markdownFile}\n<!-- </${tag[1]}> -->`)
        }
        return result
    }

    async markdownContentFromGithub(filename, release) {
        if (githubs.keys.includes(filename)) {
            return githubs.valueOfFilename(filename, release)
        }
        return (await MarkdownContents.makeMarkdownContentsFromPinpointGithub(filename)).contents
    }
}

const githubs = {
    valueOfFilename: async function (filename, release) {
        switch (filename) {
            case 'latestReleaseNotes.md':
                return ReleaseNotes.makeLatestReleaseNotes(release).contents
            default:
                return (await MarkdownContents.makeMarkdownContentsFromPinpointReadme(filename)).contents
        }
    },
    keys: ['latestReleaseNotes.md', 'compatibilityHbase.md', 'compatibilityJava.md', 'compatibilityPinpoint.md']
}

module.exports = TemplateEngine