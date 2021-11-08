/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')
const github = require('@actions/github')
const core = require('@actions/core')
const ReleaseNotes = require('./release-notes')

class GithubRelease {
    static async latest() {
        const { data } = await axios.get(`https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest`)
        return data
    }

    static async make() {
        const envClientPayload = core.getInput('client_payload')
        if (!envClientPayload) {
            return
        }
        const payload = envClientPayload.length > 0 ? JSON.parse(envClientPayload) : github.context.payload['client_payload']
        const { data } = await axios.get(`https://api.github.com/users/${payload.username}`)
        return new GithubRelease(payload, { name: data.name, email: `${payload.username}@users.noreply.github.com` })
    }

    static async makeByLatestGithubReleaseNotes() {
        const { data } = await axios.get(`https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest`)
        const tagName = ReleaseNotes.tagName(data.tag_name)
        return new GithubRelease({
            release: {
                name: data.name,
                body: ReleaseNotes.formattedReleaseNotes(tagName, data.body),
                tag_name: tagName,
                html_url: data.url
            }
        }, {
            name: 'github-actions[bot]',
            email: '41898282+github-actions[bot]@users.noreply.github.com'
        })
    }

    constructor(payload, author) {
        this.name = payload.release.name
        this.body = payload.release.body
        this.author = author
        this.tagName = payload.release.tag_name
        this.htmlURL = payload.release.html_url
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
}

module.exports = GithubRelease