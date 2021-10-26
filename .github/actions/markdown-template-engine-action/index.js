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
const ReleaseNotes = require('./lib/release-notes')

const run = async () => {
  try {
    const templateMarkdownFile = core.getInput('template_markdown_file')
    const template = await fs.readFile(templateMarkdownFile, 'utf8')

    const version = (new ReleaseNotes(template)).version()


    const engine = new TemplateEngine(template)
    const markdownContent = await engine.markdownContent()
    fs.outputFileSync(templateMarkdownFile, markdownContent)
    core.setOutput('markdown', markdownContent)

    const payload = github.context.payload['client_payload'] || {}
    core.info(`The event payload: ${payload}`)
    const email = payload['author-email'] || 'yongseok.kang@navercorp.com'
    const authorName = payload['author_name'] || 'feelform'
    core.info(`email: ${email}, authorName: ${authorName}`)

    const releaseNote = engine.markdownContents.markdownContentsFromPinpointLatestReleaseNotes()

    core.info('Checking for changes')
    const changedFiles = (await git.diffSummary()).files.length
    if (changedFiles > 0) {
      await git
        .addConfig('user.email', email)
        .addConfig('user.name', authorName)
        .addConfig('author.email', email)
        .addConfig('author.name', authorName)

      core.info(`> Found ${changedFiles} changed files.`)
      await git.add(templateMarkdownFile)
      core.info(`> git add ${templateMarkdownFile} file.`)
      await git.commit(`Update ${templateMarkdownFile} file.`)
      core.info(`> git commit ${templateMarkdownFile} file.`)
      await git.push()
      core.info(`> git push.`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()