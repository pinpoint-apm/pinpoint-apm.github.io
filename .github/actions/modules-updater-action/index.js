/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const core = require('@actions/core')
const github = require('@actions/github')
const fs = require("fs-extra")

const run = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const templateMarkdownFile = core.getInput('template_markdown_file')
    const markdownContent = await fs.readFile(templateMarkdownFile, 'utf8')
    console.log(`readfile result: ${markdownContent}`)


    core.setOutput('data', markdownContent)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()