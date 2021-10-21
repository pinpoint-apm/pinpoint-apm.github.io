/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')


const whatsNewTempate = `# What's New in __VERSION__
__BODY__
`
class MarkdownContents {
    async markdownContentsFromPinpointGithub(fileName) {
        const { data } = await axios.get(`https://raw.githubusercontent.com/pinpoint-apm/pinpoint/master/doc/${fileName}`, { responseType: 'text' })
        return data
    }

    async markdownContentsFromPinpointLatestReleaseNotes() {
        const data = await this.getLatestReleaseNotes()
        const latestReleaseNotes = whatsNewTempate.replace('__VERSION__', data.tag_name)
            .replace('__BODY__', data.body)
        return latestReleaseNotes
    }

    async getLatestReleaseNotes() {
        const { data } = await axios.get(`https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest`)
        return data
    }
}

module.exports = MarkdownContents