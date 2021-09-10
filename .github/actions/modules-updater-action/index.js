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

const run = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const templateMarkdownFile = core.getInput('template_markdown_file')
    const template = await fs.readFile(templateMarkdownFile, 'utf8')
    const engine = new TemplateEngine(template)

    fs.outputFileSync(templateMarkdownFile, 'utf8')
    core.setOutput('markdown', await engine.markdownContent())

    core.info('> Checking for uncommitted changes in the git working tree...')
    const changedFiles = (await git.diffSummary(['--cached'])).files.length
    if (changedFiles > 0) {
      core.info(`> Found ${changedFiles} changed files.`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()