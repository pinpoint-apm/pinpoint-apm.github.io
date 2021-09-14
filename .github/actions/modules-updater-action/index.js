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
const baseDir = process.cwd()
const simpleGit = require('simple-git')
const git = simpleGit({ baseDir })

const run = async () => {
  try {
    const templateMarkdownFile = core.getInput('template_markdown_file')
    const template = await fs.readFile(templateMarkdownFile, 'utf8')
    const engine = new TemplateEngine(template)

    const markdownContent = await engine.markdownContent()
    fs.outputFileSync(templateMarkdownFile, '')
    core.setOutput('markdown', markdownContent)

    core.info('Checking for changes')
    const changedFiles = (await git.diffSummary()).files.length
    if (changedFiles > 0) {
      await git
        .addConfig('author.email', getInput('author_email') || 'yongseok.kang@navercorp.com', undefined, log)
        .addConfig('author.name', getInput('author_name') || 'Yongseok Kang', undefined, log)

      core.info(`> Found ${changedFiles} changed files.`)
      await git.add(templateMarkdownFile)
      core.info(`> git add ${templateMarkdownFile} file.`)
      await git.commit('Update ${templateMarkdownFile} file.')
      core.info(`> git commit ${templateMarkdownFile} file.`)
      await git.push()
      core.info(`> git push.`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()