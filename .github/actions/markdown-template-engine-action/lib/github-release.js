/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')

class GithubRelease {
    static async latest() {
        const { data } = await axios.get(`https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest`)
        return data
    }
}

module.exports = GithubRelease