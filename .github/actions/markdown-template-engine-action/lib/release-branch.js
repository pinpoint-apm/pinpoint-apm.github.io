/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const fs = require('fs-extra')
const os = require('os')
const path = require('path')
const simpleGit = require('simple-git')

class ReleaseBranch {
    constructor(git, version, pinpointReleasePublishedAt) {
        this.git = git
        this.version = version
        this.pinpointReleasePublishedAt = pinpointReleasePublishedAt
    }

    async create(templateMarkdownFile, releaseNotesCommitMessage) {
        const releaseNotesCommit = await this.revparse('HEAD')
        const releaseBranchCommit = this.pinpointReleasePublishedAt
            ? await this.commitReleaseNotesOn(await this.lastCommitBeforePinpointRelease(), releaseNotesCommit, path.posix.normalize(templateMarkdownFile), releaseNotesCommitMessage)
            : releaseNotesCommit
        await this.git.push('origin', `${releaseBranchCommit}:refs/heads/${this.version}`)
        return releaseBranchCommit
    }

    async lastCommitBeforePinpointRelease() {
        const commitBeforeReleaseNotes = await this.revparse('HEAD^')
        const lastCommit = (await this.git.raw(['rev-list', '-1', '--first-parent', `--before=${this.pinpointReleasePublishedAt}`, commitBeforeReleaseNotes])).trim()
        return lastCommit || commitBeforeReleaseNotes
    }

    async commitReleaseNotesOn(lastCommitBeforePinpointRelease, releaseNotesCommit, templateMarkdownFile, releaseNotesCommitMessage) {
        const indexDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'release-branch-index-'))
        try {
            const releaseBranchGit = simpleGit({ baseDir: await this.revparse('--show-toplevel') }).env({
                ...process.env,
                GIT_INDEX_FILE: path.join(indexDirectory, 'index'),
                GIT_AUTHOR_DATE: this.pinpointReleasePublishedAt,
                GIT_COMMITTER_DATE: this.pinpointReleasePublishedAt
            })
            const releaseNotesBlob = (await releaseBranchGit.raw(['rev-parse', `${releaseNotesCommit}:${templateMarkdownFile}`])).trim()
            await releaseBranchGit.raw(['read-tree', lastCommitBeforePinpointRelease])
            await releaseBranchGit.raw(['update-index', '--add', '--cacheinfo', `100644,${releaseNotesBlob},${templateMarkdownFile}`])
            const releaseBranchTree = (await releaseBranchGit.raw(['write-tree'])).trim()
            if (releaseBranchTree === await this.revparse(`${lastCommitBeforePinpointRelease}^{tree}`)) {
                return lastCommitBeforePinpointRelease
            }
            return (await releaseBranchGit.raw(['commit-tree', releaseBranchTree, '-p', lastCommitBeforePinpointRelease, '-m', releaseNotesCommitMessage])).trim()
        } finally {
            await fs.remove(indexDirectory)
        }
    }

    async revparse(...args) {
        return (await this.git.revparse(args)).trim()
    }
}

module.exports = ReleaseBranch
