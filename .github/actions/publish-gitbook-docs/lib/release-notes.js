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
            .replace('__BODY__', ReleaseNotes.softLineBreaksToHardLineBreaks(ReleaseNotes.imgTagsToMarkdownImages(contents)))
    }

    // https://spec.commonmark.org/0.31.2/#hard-line-breaks
    static softLineBreaksToHardLineBreaks(contents) {
        const lines = contents.split(/(?<=\n)/)
        let inFencedCode = false
        return lines.map((line, index) => {
            const isFence = /^\s*(```|~~~)/.test(line)
            if (isFence) {
                inFencedCode = !inFencedCode
            }
            const text = line.replace(/\r?\n$/, '')
            const lineEnding = line.substring(text.length)
            const nextLine = lines[index + 1]
            const breaksBeforeNextLine = text.trim() !== '' && nextLine !== undefined && nextLine.trim() !== ''
            const endsWithHardBreak = / {2}$|\\$|<br\s*\/?>$/.test(text)
            if (isFence || inFencedCode || !breaksBeforeNextLine || endsWithHardBreak) {
                return line
            }
            return `${text}  ${lineEnding}`
        }).join('')
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