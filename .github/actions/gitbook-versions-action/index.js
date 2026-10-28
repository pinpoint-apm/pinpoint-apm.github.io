/**
 * Pinpoint GitBook versions action
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

'use strict'

const fs = require('fs')
const util = require('util')
const execFile = util.promisify(require('child_process').execFile)
const GitbookVersions = require('./lib/gitbook-versions')

const publishedSiteUrl = 'https://pinpoint-apm.gitbook.io/pinpoint/'

// https://docs.github.com/en/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions#inputs
function input(name) {
  return process.env[`INPUT_${name.toUpperCase()}`] || ''
}

function dispatchedPinpointRelease() {
  if (!process.env.GITHUB_EVENT_PATH) {
    return undefined
  }
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'))
  return (event.client_payload || {}).release
}

async function fetchLatestPinpointRelease() {
  const response = await fetch('https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest')
  if (!response.ok) {
    throw new Error(`Latest Pinpoint release request failed with status ${response.status}`)
  }
  return response.json()
}

async function runCommand([file, ...args], options = {}) {
  const gitbookToken = input('gitbook_token')
  const env = gitbookToken ? { ...process.env, GITBOOK_TOKEN: gitbookToken } : process.env
  const { stdout } = await execFile(file, args, { maxBuffer: 16 * 1024 * 1024, env, ...options })
  return stdout
}

const run = async () => {
  try {
    const versions = await GitbookVersions.versionsToAdd(input('versions'), dispatchedPinpointRelease(), fetchLatestPinpointRelease)
    console.log(`GitBook versions to add: ${versions.join(' ')}`)
    const addedVersions = await new GitbookVersions(runCommand, publishedSiteUrl).add(versions)
    console.log(`Added GitBook versions: ${addedVersions.join(' ') || 'none'}`)
  } catch (error) {
    console.error(error)
    console.log(`::error::${error.message}`)
    process.exitCode = 1
  }
}

run()
