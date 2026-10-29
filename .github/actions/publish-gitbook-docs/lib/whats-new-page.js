/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const ReleaseNotes = require('./release-notes')

const pinpointGithubRepository = 'pinpoint-apm/pinpoint'
const readmeSectionFiles = ['compatibilityHbase.md', 'compatibilityJava.md', 'compatibilityPinpoint.md', 'compatibilityFlink.md', 'compatibilityPinot.md']

async function fetchText(url) {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`${url} failed with status ${response.status}`)
    }
    return response.text()
}

class WhatsNewPage {
    constructor(whatsNew) {
        this.whatsNew = whatsNew
        this.tagExpression = /<!--\s<(?!\/)(?<markdownfile>.*.md)>\s-->[\n\r]/gm 
    }

    async markdownContent(githubRelease) {
        let tagExpression = /<!--\s<(?!\/)(?<markdownfile>.*.md)>\s-->[\n\r]/gm
        let tag
        let result = this.whatsNew
        while ((tag = tagExpression.exec(this.whatsNew)) !== null) {
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
        if (filename === 'latestReleaseNotes.md') {
            return ReleaseNotes.makeLatestReleaseNotes(githubRelease).contents
        }
        if (readmeSectionFiles.includes(filename)) {
            return this.readmeSection(filename)
        }
        return fetchText(`https://raw.githubusercontent.com/${pinpointGithubRepository}/master/doc/${filename}`)
    }

    async readmeSection(filename) {
        this.readme ??= await fetchText(`https://raw.githubusercontent.com/${pinpointGithubRepository}/master/README.md`)
        const match = RegExp(`^<!--\\s<${filename}>\\s-->$\\s(?<body>[\\s\\S]*)^<!--\\s<\\/${filename}>\\s-->`, 'gm').exec(this.readme)
        return match ? match.groups.body : undefined
    }
}

module.exports = WhatsNewPage
