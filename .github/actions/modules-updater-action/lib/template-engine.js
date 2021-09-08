/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'
const core = require('@actions/core')
const github = require('@actions/github')
const fs = require("fs-extra")

class TemplateEngine {
    constructor(templateFile) {
        this.templateFile = templateFile
    }

    async markdownContent() {
        const file = this.templateFile
        const template = await fs.readFile(file, 'utf8')
    }
}

module.exports = TemplateEngine