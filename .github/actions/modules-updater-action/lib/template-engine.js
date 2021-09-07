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
        this.template = await fs.readFile(templateFile, 'utf8')
    }

    markdownContent() {
        return this.template
    }
}

module.exports = TemplateEngine