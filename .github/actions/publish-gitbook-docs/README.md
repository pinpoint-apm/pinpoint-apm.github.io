# Publish GitBook docs action

Publishes one Pinpoint release to the docs site. The workflow `.github/workflows/publish-gitbook-docs.yml` runs it on the `release-pinpoint` dispatch from pinpoint-apm/pinpoint, daily, and by hand.

1. Resolve the release: `client_payload.release.id` from the dispatch is looked up at `GET /repos/pinpoint-apm/pinpoint/releases/{id}` with `client_payload.username` as the commit author; a scheduled or manual run takes the latest Pinpoint release with the github-actions bot as author. With the `versions` input, steps 1 to 5 run for each listed version, its release looked up by tag (backfill).
2. Render the sections of the What's New page `main.md`: the release body as What's new, and the README and `doc/` files of pinpoint-apm/pinpoint.
3. Commit the rendered `main.md` to `main` when the release version is at least the version of the What's New page on `main`. GitBook Git Sync publishes `main` as `latest-snapshot`.
4. Push the release notes to the docs branch `vX.Y.Z`: a missing branch is created from the last docs commit before the Pinpoint release `published_at`; an existing branch gets the edited notes on its tip. A release whose tag is not `vX.Y.Z` fails the run.
5. Publish the GitBook version `vX.Y.Z` when the docs branch moved in step 4, or for every version of the `versions` input: a missing site space is added, imported from the docs branch and sorted newest first; an existing one is imported again.

## Inputs

| Input | Default | Meaning |
| --- | --- | --- |
| `whats_new_file` | `./main.md` | The What's New page whose sections are rendered |
| `versions` | empty | Space-separated `vX.Y.Z` docs versions to publish instead of the release of this run: each release is fetched by tag and its What's New goes to its docs branch and GitBook version (backfill) |
| `gitbook_token` | required | GitBook personal API token with write access to the site |

## Development

`npm ci && npm test` in this directory. The tests use Tape; the GitBook CLI and git are faked or run against temporary repositories, except `github latest release notes`, which reads the live Pinpoint release.
