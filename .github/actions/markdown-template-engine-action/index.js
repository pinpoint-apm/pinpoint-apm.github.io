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
const MarkdownContents = require('./lib/markdown-contents')
const GithubRelease = require('./lib/github-release')

// https://github.com/steveukx/git-js/blob/main/test/integration/branches.spec.ts
const run = async () => {
  try {
    const sectionGithubPath = core.getInput('section_github_path')
    MarkdownContents.setPinpointReadmeGithubPath(sectionGithubPath)

    const templateMarkdownFile = core.getInput('template_markdown_file')
    const template = await fs.readFile(templateMarkdownFile, 'utf8')

    const templateVersion = ReleaseNotes.makeOfMarkdownContents(template).getVersionWithV()
    core.info(`templateVersion: ${templateVersion}`)

    let githubRelease = await GithubRelease.make()
    core.info(`githubRelease by GithubRelease.make(): ${githubRelease}`)
    if (!githubRelease) {
      githubRelease = await GithubRelease.makeByLatestGithubReleaseNotes()
    }

    let engine = new TemplateEngine(template)
    const email = githubRelease.getAuthorEmail()
    const authorName = githubRelease.getAuthorName()
    core.info(`email: ${email}, authorName: ${authorName}`)

    const markdownContent = await engine.markdownContent(githubRelease)
    const disableChanges = core.getInput('disable_sync_changes')
    if (markdownContent && disableChanges.length == 0) {
      fs.outputFileSync(templateMarkdownFile, markdownContent)
    }
    core.info(`markdownContent ${markdownContent}`)

    core.info('Checking for changes')
    const changedFiles = (await git.diffSummary()).files.length
    if (changedFiles > 0 && disableChanges.length == 0) {
      await git
        .addConfig('user.email', email)
        .addConfig('user.name', authorName)
        .addConfig('author.email', email)
        .addConfig('author.name', authorName)

      core.info(`> Found ${changedFiles} changed files.`)
      await git.add(templateMarkdownFile)
      core.info(`> git add ${templateMarkdownFile} file.`)
      await git.commit(githubRelease.commitLog())
      core.info(`> git commit ${templateMarkdownFile} file.`)
      await git.push()
      core.info(`> git push.`)

      const disableBranch = core.getInput('disable_branch')
      const version = githubRelease.getVersion()
      if (version && githubRelease.needsBranch(templateVersion) && disableBranch.length == 0) {
        await git.branch([version])
        await git.push('origin', version)
      }
    }
  } catch (error) {
    console.error(error)
    core.setFailed(error.message)
  }
}

run()