/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')
const GithubRelease = require('./github-release')

const whatsNewTempate = `# What's New in v__VERSION__
__BODY__
`

class ReleaseNotes {
    constructor(contents, version) {
        this.contents = contents
        this.version = version
    }

    getVersion() {
        return `${this.version}`
    }

    getVersionWithV() {
        return `v${this.version}`
    }

    static makeLatestReleaseNotes(release) {
        const tagName = ReleaseNotes.tagName(release.getTagName())
        const latestReleaseNotes = whatsNewTempate.replace('__VERSION__', tagName)
            .replace('__BODY__', release.getBody())
        return new ReleaseNotes(latestReleaseNotes, tagName)
    }

    static tagName(version) {
        return version.startsWith('v') ? version.substring(1) : version
    }

    static async makeByLatestGithubReleaseNotes() {
        const { data } = await axios.get(`https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest`)
        const tagName = ReleaseNotes.tagName(data.tag_name)
        const latestReleaseNotes = whatsNewTempate.replace('__VERSION__', tagName)
            .replace('__BODY__', data.body)
        return makeLatestReleaseNotes(new GithubRelease({
            release: {

            }
        }))
    }

    static makeOfMarkdownContents(contents) {
        const match = /# What's New in v(?<version>[0-9.]+)/gm.exec(contents)
        if (!match) {
            return new ReleaseNotes(contents)
        }
        return new ReleaseNotes(contents, match.groups.version)
    }
}

module.exports = ReleaseNotes