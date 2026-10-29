/**
 * Pinpoint GitBook docs publisher
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const core = require('@actions/core')
const fs = require('fs-extra')
const util = require('util')
const execFile = util.promisify(require('child_process').execFile)
const simpleGit = require('simple-git')
const WhatsNew = require('./lib/whats-new')
const PinpointRelease = require('./lib/pinpoint-release')
const GitbookVersions = require('./lib/gitbook-versions')

const publishedSiteUrl = 'https://pinpoint-apm.gitbook.io/pinpoint/'
const git = simpleGit({ baseDir: process.cwd() })

function clientPayload() {
  if (!process.env.GITHUB_EVENT_PATH) {
    return undefined
  }
  return JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')).client_payload
}

function isPinpointReleaseEvent() {
  return process.env.GITHUB_EVENT_NAME === 'repository_dispatch'
}

async function runCommand([file, ...args], options = {}) {
  const gitbookToken = core.getInput('gitbook_token')
  const env = gitbookToken ? { ...process.env, GITBOOK_TOKEN: gitbookToken } : process.env
  const { stdout } = await execFile(file, args, { maxBuffer: 16 * 1024 * 1024, env, ...options })
  return stdout
}

const run = async () => {
  try {
    const whatsNewFile = core.getInput('whats_new_file')
    const whatsNew = new WhatsNew(git, whatsNewFile, await fs.readFile(whatsNewFile, 'utf8'))

    const gitbookVersions = new GitbookVersions(runCommand, publishedSiteUrl)
    const versions = core.getInput('versions').split(/\s+/).filter(input => input.length > 0)
    if (versions.length > 0) {
      for (const version of versions) {
        await whatsNew.publish(await PinpointRelease.fetchByTag(version))
      }
      await gitbookVersions.publish(versions)
      return
    }

    let release
    if (isPinpointReleaseEvent()) {
      const payload = clientPayload()
      release = await PinpointRelease.fetchById(payload.release.id, payload.username)
    } else {
      release = await PinpointRelease.fetchLatest()
    }
    if (await whatsNew.publish(release)) {
      await gitbookVersions.publish([release.getVersion()])
    }
  } catch (error) {
    console.error(error)
    core.setFailed(error.message)
  }
}

run()
