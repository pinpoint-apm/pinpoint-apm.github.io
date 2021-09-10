/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const core = require('@actions/core')
const github = require('@actions/github')
const fs = require("fs-extra")
const TemplateEngine = require('./lib/template-engine')

const path = require('path')
const baseDir = path.join(process.cwd(), core.getInput('cwd') || '')
const simpleGit = require('simple-git')
const git = simpleGit({ baseDir })
console.log(`baseDir: ${baseDir}`)

const run = async () => {
  try {

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);

    // `who-to-greet` input defined in action metadata file
    const templateMarkdownFile = core.getInput('template_markdown_file')
    const template = await fs.readFile(templateMarkdownFile, 'utf8')
    const engine = new TemplateEngine(template)

    const markdownContent = await engine.markdownContent()
    console.log(`markdownContent ${markdownContent}`)
    // fs.outputFileSync(templateMarkdownFile, 'utf8')
    core.setOutput('markdown', markdownContent)

    core.info('Checking for changes')
    const changedFiles = (await git.diffSummary(['--cached'])).files.length
    if (changedFiles > 0) {
      core.info(`> Found ${changedFiles} changed files.`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()