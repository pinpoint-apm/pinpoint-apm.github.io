/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const whatsNewTempate = `# What's New in v__VERSION__
__BODY__
`

class ReleaseNotes {
    constructor(contents, version) {
        this.contents = contents
        this.version = version
    }

    static makeLatestReleaseNotes(release) {
        const tagName = ReleaseNotes.tagName(release.getTagName())
        const latestReleaseNotes = ReleaseNotes.formattedReleaseNotes(tagName, release.getBody())
        return new ReleaseNotes(latestReleaseNotes, tagName)
    }

    static formattedReleaseNotes(tagName, contents) {
        return whatsNewTempate.replace('__VERSION__', tagName)
            .replace('__BODY__', ReleaseNotes.imgTagsToMarkdownImages(contents))
    }

    // GitBook renders <img width height> as a fixed-height inline style, which stretches the image: pinpoint-apm/pinpoint-apm.github.io#106
    static imgTagsToMarkdownImages(contents) {
        return contents.replace(/<img\s[^>]*?src="([^"]*)"[^>]*>/g, (imgTag, src) => {
            const alt = /\salt="([^"]*)"/.exec(imgTag)
            return `![${alt ? alt[1] : ''}](${src})`
        })
    }

    static tagName(version) {
        return version.startsWith('v') ? version.substring(1) : version
    }

    static getVersionWithV(markdown) {
        const match = /# What's New in (?<version>v[0-9.]+)/m.exec(markdown)
        return match ? match.groups.version : undefined
    }
}

module.exports = ReleaseNotes