/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')
const github = require('@actions/github')

class GithubRelease {
    static async latest() {
        const { data } = await axios.get(`https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest`)
        return data
    }

    static async make() {
        const envClientPayload = process.env['ENV_CLIENT_PAYLOAD']
        const payload = envClientPayload ? JSON.parse(envClientPayload) : github.context.payload['client_payload']
        const { data } = await axios.get(`https://api.github.com/users/${payload.username}`)
        return new GithubRelease(payload, { name: data.name, email: `${payload.username}@users.noreply.github.com` })
    }

    constructor(payload, author) {
        this.name = payload.release.name
        this.body = payload.release.body
        this.author = author
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
}

module.exports = GithubRelease