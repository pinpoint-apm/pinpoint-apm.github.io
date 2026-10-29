---
name: gitbook-versions
description: GitBook CLI commands, IDs and auth for the Pinpoint docs version spaces (vX.Y.Z) on https://pinpoint-apm.gitbook.io/pinpoint. Use when a Pinpoint release version is missing from or misordered on the GitBook site, when adding, ordering or importing a version space from its docs branch, when calling `@gitbook/cli` or the GitBook API, or when changing the GitBook version automation or its fixtures.
---

## Site

- Look up the IDs with a read-only `login`: `organizations list --json` gives the pinpoint-apm org ID (`<org>`), then `organizations sites list --json -- <org>` gives the ID of the site whose `urls.published` is https://pinpoint-apm.gitbook.io/pinpoint/ (`<site>`). The automation looks them up the same way on every run, so no ID is kept in the repository.
- Each version is one site space titled and pathed `vX.Y.Z`, ordered newest first after the default site space `latest-snapshot`, which is Git Sync'd to `main`.
- Older versions are Git Sync'd to the docs branch `vX.Y.Z` or hold content without Git Sync.

## CLI

Run `npx -y @gitbook/cli@0.32.10` from `~`, not from the repository, so npx does not resolve the repository's packages.

- The org ID starts with `-`, so pass positional arguments after `--`: `... site-spaces list --json -- <org> <site>`.
- `login` (browser OAuth) only grants read scopes. Writes fail with `403 ... requires user auth`. For writes, use a personal API token from https://app.gitbook.com/account/developer.
- The CLI prefers a stored OAuth login over a token stored with `auth --token`. The `GITBOOK_TOKEN` environment variable overrides both, so pass the token that way, as CI does with the `GITBOOK_TOKEN` secret. Never commit the token.

## Commands

Prefix: `npx -y @gitbook/cli@0.32.10 organizations sites`. `<org>` and `<site>` are the IDs from Site.

- List versions: `site-spaces list --limit 100 --json -- <org> <site>` → `{items:[{id, title, path, default, space:{id, gitSync?:{url}}}]}`
- Add a version: `site-spaces add --body '{"spaceId":null,"empty":true,"title":"vX.Y.Z"}' --json -- <org> <site>` → `{id, title, path, space:{id}}`. The path is taken from the title, so `site-spaces update --path` is not needed.
- Read the order: `structure get --json -- <org> <site>` → `{type:"siteSpaces", structure:[site spaces in display order]}`
- Move a version: `structure sort --body '{"item":{"type":"site-space","id":"<siteSpaceId>"},"position":{"before":{"type":"site-space","id":"<otherSiteSpaceId>"}}}' -- <org> <site>`. `position` is required.
- Import content from the docs branch: `npx -y @gitbook/cli@0.32.10 spaces git import --body '{"url":"https://github.com/pinpoint-apm/pinpoint-apm.github.io.git","ref":"refs/heads/vX.Y.Z"}' -- <spaceId>` → 204, import queued. Add `"force":true` to the body to import again into a space that already has content.

The JSON fields the version automation reads are recorded from the real CLI in `.github/actions/publish-gitbook-docs/__test__/fixtures/` and checked by `gitbook-fixtures.test.js`. Re-record them when the CLI version changes.

## Automation

- The `Publish GitBook docs` workflow (`.github/workflows/publish-gitbook-docs.yml`) runs `.github/actions/publish-gitbook-docs` with the `GITBOOK_TOKEN` secret. It pushes the release notes to the docs branch and then publishes the GitBook version, for the release of that run (the `release-pinpoint` dispatch, else the latest `pinpoint-apm/pinpoint` GitHub release) or for each version in the `versions` input of a manual run, looked up by tag.
- Its `lib/gitbook-versions.js` follows "Add a missing version by hand" below. It skips a version without a docs branch on `origin`. A version already on the site is imported again from its docs branch with `force`, without sorting. After adding at least one version, it re-sorts all site spaces as in Ordering and fails the run if `structure get` differs from the wanted order. Its tests are in `__test__/gitbook-versions.test.js`.
- Backfill: run the workflow by hand with `versions=vA.B.C vX.Y.Z`.

## Ordering

`structure sort` is relative to sort keys, and `structure get` lists them in reverse: `after X` puts the item in front of X in the display order, and `before X` puts it behind X. A single `before X` does not always land right behind X: in the 2026-10-28 backfill, v3.0.5 moved `before` v3.1.0 landed behind v3.0.3. So move every site space, not only the new one. To restore the order, sort the site spaces as wanted (default first, then versions newest first) and move each one `before` the previous one, then check with `structure get`.

## Add a missing version by hand

1. `git ls-remote --heads upstream vX.Y.Z`: the docs branch must exist.
2. `site-spaces list`: stop if a site space with path `vX.Y.Z` already exists.
3. `site-spaces add`, then `spaces git import` into the new `space.id`.
4. Re-sort all site spaces (see Ordering) and check `structure get`.
5. Check https://pinpoint-apm.gitbook.io/pinpoint/vX.Y.Z.

## Limits

- The CLI cannot set up Git Sync (only `spaces git info get` and `installations list`). `spaces git import` is a one-shot import; later changes to the branch need another import with `force`, which the workflow does on every run for the published version, or Git Sync set up in the GitBook UI.
