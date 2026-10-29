# AGENTS.md — pinpoint-apm.github.io

Personal, uncommitted instructions go in `~/.claude/CLAUDE.md` or `~/.claude/skills`. A `CLAUDE.local.md` anywhere in the tree stops Claude Code from reading this file.

## Testing

- The docs are published by GitBook from this repo. Check documentation changes in the GitBook preview of the branch.
- Changes to `.github/actions/publish-gitbook-docs` need tests in its `__test__/` directory. Run `npm ci` and then `npm test` in that directory.

## Workflow

1. **Issue**: create a GitHub issue in `pinpoint-apm/pinpoint-apm.github.io` (`gh issue create`) if none exists, with the milestone of the next release. The body opens with one or two sentences on what to do, then a task checklist. Under each task, its verification as `input → expected result` bullets that run locally. Reference links go last.
2. **Branch**: create a feature branch from `upstream/main`.
3. **Code changes**: implement the feature or fix.
4. **Testing**: add or update tests, then run them. While they run, show the developer the PR draft (title, body, milestone).
5. **Review**: stop and wait for the developer to review the diff. Do not proceed until they explicitly approve.
6. **Commit and push**: squash into a single commit (`git commit`, not amend) and push the branch. Message: `[#ISSUE_NUMBER] Short description`, the title line only.
7. **PR**: create it with `gh pr create`. Same milestone as the issue; `Closes #ISSUE_NUMBER` in the body.
8. **After merge**: `git fetch upstream` → `git checkout main` → `git rebase upstream/main` → `git push origin main` → delete the feature branch locally and remotely. Tick the issue checklist and reflect any scope change.

## Writing

Issues, PRs, commits and comments are in English, concise, bullet points, no emojis. Post once the draft is approved.

- PR: the title names the main change. The body opens with why the change was made, in one or two sentences, then `## Test plan` with the checked results and `Closes #N`. No other headers.
