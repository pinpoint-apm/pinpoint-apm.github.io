/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const simpleGit = require('simple-git')

// simple-git rejects GIT_EDITOR, GIT_ASKPASS and similar variables in a custom environment, so only PATH and HOME are passed on
function gitEnvironment(overrides) {
    return { PATH: process.env.PATH, HOME: process.env.HOME, ...overrides }
}

class ReleaseBranch {
    constructor(git, version, pinpointReleasePublishedAt) {
        this.git = git
        this.version = version
        this.pinpointReleasePublishedAt = pinpointReleasePublishedAt
    }

    async exists() {
        return (await this.git.listRemote(['--heads', 'origin', this.version])).trim().length > 0
    }

    // New branch: the release notes on top of the last docs commit before the Pinpoint release, dated at the release (#97).
    // `base` is the commit the docs history is read from: HEAD^ when HEAD is the release notes commit just made on main, else HEAD.
    async create(whatsNewFile, markdownContent, releaseNotesCommitMessage, base) {
        const parent = this.pinpointReleasePublishedAt ? await this.lastCommitBeforePinpointRelease(base) : await this.revparse('HEAD')
        const releaseBranchCommit = await this.commitMarkdownOn(parent, whatsNewFile, markdownContent, releaseNotesCommitMessage, this.pinpointReleasePublishedAt)
        await this.git.push('origin', `${releaseBranchCommit}:refs/heads/${this.version}`)
        return releaseBranchCommit
    }

    // Existing branch: the edited release notes on top of its tip, dated now (#105); undefined when the tip already has them
    async update(whatsNewFile, markdownContent, releaseNotesCommitMessage) {
        await this.git.fetch('origin', this.version)
        const tip = await this.revparse('FETCH_HEAD')
        const releaseBranchCommit = await this.commitMarkdownOn(tip, whatsNewFile, markdownContent, releaseNotesCommitMessage)
        if (releaseBranchCommit === tip) {
            return undefined
        }
        await this.git.push('origin', `${releaseBranchCommit}:refs/heads/${this.version}`)
        return releaseBranchCommit
    }

    async lastCommitBeforePinpointRelease(base) {
        const baseCommit = await this.revparse(base)
        const lastCommit = (await this.git.raw(['rev-list', '-1', '--first-parent', `--before=${this.pinpointReleasePublishedAt}`, baseCommit])).trim()
        return lastCommit || baseCommit
    }

    async commitMarkdownOn(parent, whatsNewFile, markdownContent, message, date) {
        const workDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'release-branch-'))
        try {
            const dates = date ? { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date } : {}
            const branchGit = simpleGit({ baseDir: await this.revparse('--show-toplevel') }).env(gitEnvironment({
                ...dates,
                GIT_INDEX_FILE: path.join(workDirectory, 'index')
            }))
            const markdownFile = path.join(workDirectory, 'markdown')
            await fs.outputFile(markdownFile, markdownContent)
            const blob = (await branchGit.raw(['hash-object', '-w', markdownFile])).trim()
            await branchGit.raw(['read-tree', parent])
            await branchGit.raw(['update-index', '--add', '--cacheinfo', `100644,${blob},${path.posix.normalize(whatsNewFile)}`])
            const tree = (await branchGit.raw(['write-tree'])).trim()
            if (tree === await this.revparse(`${parent}^{tree}`)) {
                return parent
            }
            return (await branchGit.raw(['commit-tree', tree, '-p', parent, '-m', message])).trim()
        } finally {
            await fs.remove(workDirectory)
        }
    }

    async revparse(...args) {
        return (await this.git.revparse(args)).trim()
    }
}

module.exports = ReleaseBranch
