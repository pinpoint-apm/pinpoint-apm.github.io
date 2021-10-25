/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')

const whatsNewTempate = `# What's New in v__VERSION__
__BODY__
`

class ReleaseNotes {
    constructor(contents) {
        this.contents = contents
    }

    static async makeLatestReleaseNotes(releaseClass) {
        const data = await releaseClass.latest()

        const tagName = data.tag_name.startsWith('v') ? data.tag_name.substring(1) : data.tag_name
        const latestReleaseNotes = whatsNewTempate.replace('__VERSION__', tagName)
            .replace('__BODY__', data.body)
        return new ReleaseNotes(latestReleaseNotes)
    }
}

module.exports = ReleaseNotes