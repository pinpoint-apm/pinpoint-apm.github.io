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

class TemplateEngine {
    constructor(template) {
        this.template = template
        this.markdownContents = new MarkdownContents()
    }

    // https://regex101.com/r/Sgd2aq/1/
    async markdownContent() {
        let tagExpression = /<!--\s<(?<markdownfile>.*.md)>\s-->\n.*<!--\s<\/[^.]*.md>\s-->/gm
        let tag
        let result = this.template
        while ((tag = tagExpression.exec(this.template)) !== null) {
            const markdownFile = await this.markdownContentFromGithub(tag[1])
            result = result.replace(RegExp(`<!--\\s<${tag[1]}>\\s-->\\n.*<!--\\s<\\/${tag[1]}>\\s-->`, 'm'), `<!-- <${tag[1]}> -->\n${markdownFile}\n<!-- </${tag[1]}> -->`)
        }
        return result
    }

    async markdownContentFromGithub(filename) {
        if (filename === 'latestReleaseNotes.md') {
            return this.markdownContents.markdownContentsFromPinpointLatestReleaseNotes()
        }
        return this.markdownContents.markdownContentsFromPinpointGithub(filename)
    }
}

module.exports = TemplateEngine