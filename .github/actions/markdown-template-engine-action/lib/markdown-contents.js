/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')
const ReleaseNotes = require('./release-notes')
const GithubRelease = require('./github-release')

const whatsNewTempate = `# What's New in v__VERSION__
__BODY__
`
class MarkdownContents {
    async markdownContentsFromPinpointGithub(fileName) {
        const { data } = await axios.get(`https://raw.githubusercontent.com/pinpoint-apm/pinpoint/master/doc/${fileName}`, { responseType: 'text' })
        return data
    }

    async markdownContentsFromPinpointLatestReleaseNotes() {
        return (await ReleaseNotes.makeLatestReleaseNotes(GithubRelease)).contents
    }
}

module.exports = MarkdownContents