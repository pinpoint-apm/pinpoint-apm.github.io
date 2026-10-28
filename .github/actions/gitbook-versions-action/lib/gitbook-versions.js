/**
 * Pinpoint GitBook versions action
 * Copyright 2026-present NAVER Corp.
 * Apache License v2.0
 */

const os = require('os')

// https://gitbook.com/docs/docs-as-code/gitbook-cli
const gitbookCli = ['npx', '-y', '@gitbook/cli@0.32.10']
const directoryWithoutRepositoryPackages = os.homedir()
const docsRepositoryUrl = 'https://github.com/pinpoint-apm/pinpoint-apm.github.io.git'

class Version {
    static parse(text) {
        const match = /^v(\d+)\.(\d+)\.(\d+)$/.exec(text)
        return match ? new Version(text, match.slice(1).map(Number)) : undefined
    }

    constructor(text, numbers) {
        this.text = text
        this.numbers = numbers
    }

    compare(other) {
        for (let i = 0; i < this.numbers.length; i++) {
            if (this.numbers[i] !== other.numbers[i]) {
                return this.numbers[i] - other.numbers[i]
            }
        }
        return 0
    }
}

class GitbookVersions {
    static async versionsToAdd(versionsInput, dispatchedPinpointRelease, fetchLatestPinpointRelease) {
        const versions = (versionsInput || '').split(/\s+/).filter(version => version.length > 0)
        if (versions.length > 0) {
            return versions
        }
        const pinpointRelease = dispatchedPinpointRelease || await fetchLatestPinpointRelease()
        return [GitbookVersions.versionOfTag(pinpointRelease.tag_name)]
    }

    static versionOfTag(tagName) {
        return tagName.startsWith('v') ? tagName : `v${tagName}`
    }

    constructor(runCommand, publishedSiteUrl) {
        this.runCommand = runCommand
        this.publishedSiteUrl = publishedSiteUrl
    }

    async add(versions) {
        const site = await this.findSite()
        const siteSpaces = (await this.gitbookJson(['organizations', 'sites', 'site-spaces', 'list', '--limit', '100', '--json', '--', site.organizationId, site.id])).items
        const addedVersions = []
        for (const version of versions) {
            if (!Version.parse(version)) {
                throw new Error(`${version} is not a vX.Y.Z version`)
            }
            if (!await this.hasDocsBranch(version)) {
                continue
            }
            if (siteSpaces.some(siteSpace => siteSpace.path === version)) {
                continue
            }
            const siteSpace = await this.gitbookJson(['organizations', 'sites', 'site-spaces', 'add', '--body', JSON.stringify({ spaceId: null, empty: true, title: version }), '--json', '--', site.organizationId, site.id])
            await this.gitbook(['spaces', 'git', 'import', '--body', JSON.stringify({ url: docsRepositoryUrl, ref: `refs/heads/${version}` }), '--', siteSpace.space.id])
            siteSpaces.push(siteSpace)
            addedVersions.push(version)
        }
        if (addedVersions.length > 0) {
            const wantedOrder = GitbookVersions.defaultThenNewestFirst(siteSpaces)
            await this.sortAll(site, wantedOrder)
            await this.verifyOrder(site, wantedOrder)
        }
        return addedVersions
    }

    async findSite() {
        const organizations = (await this.gitbookJson(['organizations', 'list', '--json'])).items
        for (const organization of organizations) {
            const sites = (await this.gitbookJson(['organizations', 'sites', 'list', '--json', '--', organization.id])).items
            const site = sites.find(site => site.urls.published === this.publishedSiteUrl)
            if (site) {
                return { organizationId: organization.id, id: site.id }
            }
        }
        throw new Error(`No GitBook site is published at ${this.publishedSiteUrl}`)
    }

    async hasDocsBranch(version) {
        return (await this.runCommand(['git', 'ls-remote', '--heads', 'origin', version])).trim().length > 0
    }

    static defaultThenNewestFirst(siteSpaces) {
        const versions = siteSpaces
            .map(siteSpace => ({ siteSpace, version: Version.parse(siteSpace.path) }))
            .filter(candidate => candidate.version)
            .sort((a, b) => b.version.compare(a.version))
            .map(candidate => candidate.siteSpace)
        return [siteSpaces.find(siteSpace => siteSpace.default), ...versions]
    }

    // A single `before X` does not always land right behind X: .claude/skills/gitbook-versions/SKILL.md Ordering
    async sortAll(site, wantedOrder) {
        for (let i = 1; i < wantedOrder.length; i++) {
            const position = { before: { type: 'site-space', id: wantedOrder[i - 1].id } }
            await this.gitbook(['organizations', 'sites', 'structure', 'sort', '--body', JSON.stringify({ item: { type: 'site-space', id: wantedOrder[i].id }, position }), '--', site.organizationId, site.id])
        }
    }

    async verifyOrder(site, wantedOrder) {
        const { structure } = await this.gitbookJson(['organizations', 'sites', 'structure', 'get', '--json', '--', site.organizationId, site.id])
        const expected = wantedOrder.map(siteSpace => siteSpace.path).join(' ')
        const actual = structure.map(siteSpace => siteSpace.path).join(' ')
        if (actual !== expected) {
            throw new Error(`GitBook version order is ${actual}, expected ${expected}`)
        }
    }

    async gitbook(args) {
        return this.runCommand([...gitbookCli, ...args], { cwd: directoryWithoutRepositoryPackages })
    }

    async gitbookJson(args) {
        return JSON.parse(await this.gitbook(args))
    }
}

module.exports = GitbookVersions
