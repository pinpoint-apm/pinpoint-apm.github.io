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
    constructor(template) {
        this.template = template
    }

    // https://regex101.com/r/Sgd2aq/1/
    async markdownContent() {
        const startTagRegExpression = /<!--\s<(?<markdownfile>[^/]*\.md)>\s-->/gm
        let openTag
        let result = this.template
        while ((openTag = startTagRegExpression.exec(this.template)) !== null) {
            const closeTag = RegExp(`<!--\\s<\\/${openTag[1]}>\\s-->`, 'gm').exec(this.template)
            if (!closeTag) {
                continue
            }

            const markdownFile = this.getContent(openTag[1])
            result = result.replace(closeTag, `${markdownFile}\n<!-- </${openTag[1]}> -->`)
        }
        return result
    }

    async getContent(file) {
        return await fs.readFile('./' + file, 'utf8')
    }
}

module.exports = TemplateEngine