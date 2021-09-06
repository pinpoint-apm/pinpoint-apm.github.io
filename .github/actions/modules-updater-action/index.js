/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const core = require('@actions/core')
const github = require('@actions/github')

try {
  // `who-to-greet` input defined in action metadata file
  const templateMarkdownFile = core.getInput('template_markdown_file')
  console.log(`Hello ${templateMarkdownFile}!`)
  const time = (new Date()).toTimeString()
  core.setOutput("time", time)

  const env = JSON.stringify(process.env)
  console.log(`process.env: ${env}`)


  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  core.setFailed(error.message)
}
