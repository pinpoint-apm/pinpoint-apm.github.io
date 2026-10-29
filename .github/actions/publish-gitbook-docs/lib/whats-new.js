/**
 * Pinpoint GitBook docs publisher
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

const fs = require('fs-extra')
const WhatsNewPage = require('./whats-new-page')
const ReleaseNotes = require('./release-notes')
const ReleaseBranch = require('./release-branch')
const Version = require('./version')

// The What's New page main.md: rendered for a Pinpoint release, committed to main for the latest release and to the vX.Y.Z docs branch for every release
class WhatsNew {
    constructor(git, whatsNewFile, whatsNew) {
        this.git = git
        this.whatsNewFile = whatsNewFile
        this.whatsNew = whatsNew
    }

    // Returns whether the docs branch vX.Y.Z moved
    async publish(release) {
        if (!Version.parse(release.getVersion())) {
            throw new Error(`${release.getVersion()} is not a vX.Y.Z version`)
        }
        await this.git
            .addConfig('user.email', release.getAuthorEmail())
            .addConfig('user.name', release.getAuthorName())
            .addConfig('author.email', release.getAuthorEmail())
            .addConfig('author.name', release.getAuthorName())

        const markdownContent = await new WhatsNewPage(this.whatsNew).markdownContent(release)
        if (!markdownContent) {
            throw new Error(`A section of ${this.whatsNewFile} has no content`)
        }

        let committedOnMain = false
        if (release.isLatestVersion(ReleaseNotes.getVersionWithV(this.whatsNew))) {
            committedOnMain = await this.commitOnMain(markdownContent, release)
            this.whatsNew = markdownContent
        }

        const releaseBranch = new ReleaseBranch(this.git, release.getVersion(), release.getPublishedAt())
        if (await releaseBranch.exists()) {
            return Boolean(await releaseBranch.update(this.whatsNewFile, markdownContent, release.commitLog()))
        }
        await releaseBranch.create(this.whatsNewFile, markdownContent, release.commitLog(), committedOnMain ? 'HEAD^' : 'HEAD')
        return true
    }

    async commitOnMain(markdownContent, release) {
        fs.outputFileSync(this.whatsNewFile, markdownContent)
        if ((await this.git.diffSummary()).files.length === 0) {
            return false
        }
        await this.git.add(this.whatsNewFile)
        await this.git.commit(release.commitLog())
        await this.git.push()
        return true
    }
}

module.exports = WhatsNew
