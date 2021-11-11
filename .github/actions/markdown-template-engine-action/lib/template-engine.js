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

    async markdownContent(githubRelease) {
        let tagExpression = /<!--\s<(?!\/)(?<markdownfile>.*.md)>\s-->\n/gm
        let tag
        let result = this.template
        while ((tag = tagExpression.exec(this.template)) !== null) {
            const markdownFile = await this.markdownContentFromGithub(tag[1], githubRelease)
            if (!markdownFile) {
                return
            }
            result = result.replace(RegExp(`<!--\\s<${tag[1]}>\\s-->\\n[\\s\\S]*<!--\\s<\\/${tag[1]}>\\s-->`, 'm'), `<!-- <${tag[1]}> -->\n${markdownFile}\n<!-- </${tag[1]}> -->`)
        }

        let imageRegex = /(?<image>!\[.*]\([^)]*\))/gm
        let imageMatch;
        while ((imageMatch = imageRegex.exec(result)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (imageMatch.index === imageRegex.lastIndex) {
                imageRegex.lastIndex++;
            }

            result = result.replace(imageMatch[1], `\n\n${imageMatch[1]}\n\n`)
        }
        return result
    }

    async markdownContentFromGithub(filename, githubRelease) {
        if (githubs.keys.includes(filename)) {
            return githubs.valueOfFilename(filename, githubRelease)
        }
        return (await MarkdownContents.makeMarkdownContentsFromPinpointGithub(filename)).contents
    }
}

const githubs = {
    valueOfFilename: async function (filename, githubRelease) {
        switch (filename) {
            case 'latestReleaseNotes.md':
                return ReleaseNotes.makeLatestReleaseNotes(githubRelease).contents
            default:
                return (await MarkdownContents.makeMarkdownContentsFromPinpointReadme(filename)).contents
        }
    },
    keys: ['latestReleaseNotes.md', 'compatibilityHbase.md', 'compatibilityJava.md', 'compatibilityPinpoint.md']
}

module.exports = TemplateEngine