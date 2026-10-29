/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const ReleaseNotes = require('./release-notes')
const Version = require('./version')

const pinpointReleasesUrl = 'https://api.github.com/repos/pinpoint-apm/pinpoint/releases'
const botAuthor = { name: 'github-actions[bot]', email: '41898282+github-actions[bot]@users.noreply.github.com' }

class PinpointRelease {
    // pinpoint-apm/pinpoint dispatches only the release id: the whole release exceeds the client_payload size limit, pinpoint-apm/pinpoint-apm.github.io#105
    // `publishedBy` is the GitHub user who published the release; it becomes the author of the docs commits
    static async fetchById(id, publishedBy, fetchJson = PinpointRelease.fetchJson) {
        const user = await fetchJson(`https://api.github.com/users/${publishedBy}`)
        const release = await fetchJson(`${pinpointReleasesUrl}/${id}`)
        return new PinpointRelease(release, { name: user.name, email: `${publishedBy}@users.noreply.github.com` })
    }

    static async fetchLatest(fetchJson = PinpointRelease.fetchJson) {
        return new PinpointRelease(await fetchJson(`${pinpointReleasesUrl}/latest`), botAuthor)
    }

    static async fetchByTag(tagName, fetchJson = PinpointRelease.fetchJson) {
        return new PinpointRelease(await fetchJson(`${pinpointReleasesUrl}/tags/${tagName}`), botAuthor)
    }

    static async fetchJson(url) {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`${url} failed with status ${response.status}`)
        }
        return response.json()
    }

    constructor(release, author) {
        this.name = release.name
        this.body = release.body
        this.author = author
        this.tagName = release.tag_name
        this.htmlURL = release.html_url
        this.publishedAt = release.published_at
        this.version = ReleaseNotes.tagName(release.tag_name)
    }

    getName() {
        return this.name
    }

    getBody() {
        return this.body
    }

    getAuthorName() {
        return this.author.name
    }

    getAuthorEmail() {
        return this.author.email
    }

    commitLog() {
        return `${this.name} tag: ${this.tagName} ${this.htmlURL}`
    }

    getTagName() {
        return this.tagName
    }

    getPublishedAt() {
        return this.publishedAt
    }

    getVersion() {
        return `v${this.version}`
    }

    isLatestVersion(whatsNewVersion) {
        const whatsNew = Version.parse(whatsNewVersion)
        return !whatsNew || Version.parse(this.getVersion()).compare(whatsNew) >= 0
    }
}

module.exports = PinpointRelease
