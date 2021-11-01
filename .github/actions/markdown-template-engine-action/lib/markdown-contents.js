/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')
const ReleaseNotes = require('./release-notes')
const GithubRelease = require('./github-release')

let readmeGithubPath
const whatsNewTempate = `# What's New in v__VERSION__
__BODY__
`
let readmeGithubBody

class MarkdownContents {
    constructor(contents) {
        this.contents = contents
    }

    static async makeMarkdownContentsFromPinpointGithub(fileName) {
        const { data } = await axios.get(`https://raw.githubusercontent.com/pinpoint-apm/pinpoint/master/doc/${fileName}`, { responseType: 'text' })
        return new MarkdownContents(data)
    }

    static async makeMarkdownContentsFromPinpointLatestReleaseNotes() {
        return await ReleaseNotes.makeLatestReleaseNotes(GithubRelease)
    }

    static async makeMarkdownContentsFromPinpointReadme(filename) {
        if (!readmeGithubBody) {
            const { data } = await axios.get(`https://raw.githubusercontent.com/${readmeGithubPath}/master/README.md`, { responseType: 'text' })
            readmeGithubBody = data
        }
        return new MarkdownContents(readmeGithubBody)
    }

    static setPinpointReadmeGithubPath(path) {
        readmeGithubPath = path
    }
}

module.exports = MarkdownContents