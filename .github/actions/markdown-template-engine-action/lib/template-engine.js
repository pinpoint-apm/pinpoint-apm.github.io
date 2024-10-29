/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const core = require('@actions/core')
const MarkdownContents = require('./markdown-contents')
const ReleaseNotes = require('./release-notes')

class TemplateEngine {
    constructor(template) {
        this.template = template
        this.tagExpression = /<!--\s<(?!\/)(?<markdownfile>.*.md)>\s-->[\n\r]/gm 
    }

    async markdownContent(githubRelease) {
        let tagExpression = /<!--\s<(?!\/)(?<markdownfile>.*.md)>\s-->[\n\r]/gm
        let tag
        let result = this.template
        while ((tag = tagExpression.exec(this.template)) !== null) {
            const markdownFile = await this.markdownContentFromGithub(tag[1], githubRelease)
            if (!markdownFile) {
                return
            }
            result = result.replace(RegExp(`<!--\\s<${tag[1]}>\\s-->[\\n\\r][\\s\\S]*<!--\\s<\\/${tag[1]}>\\s-->`, 'm'), `<!-- <${tag[1]}> -->\n${markdownFile}\n<!-- </${tag[1]}> -->`)
        }

        let brRegex = /^(?<br>\<br\>)(?<text>\s{1,2}\S+)/gm
        let brMatch
        while ((brMatch = brRegex.exec(result)) !== null) {
            if (brMatch.index === brRegex.lastIndex) {
                brRegex.lastIndex++;
            }

            result = result.replace(brMatch[0], `${brMatch[1]}\n${brMatch[2]}`)
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
    keys: ['latestReleaseNotes.md', 'compatibilityHbase.md', 'compatibilityJava.md', 'compatibilityPinpoint.md', 'compatibilityFlink.md', 'compatibilityPinot.md']
}

module.exports = TemplateEngine