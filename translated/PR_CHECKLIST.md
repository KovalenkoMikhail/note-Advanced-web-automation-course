# PR Checklist for Translated Lecture Notes

This checklist contains best practices for preparing and opening a pull request that adds translated lecture notes to the repository.

1. Create a feature branch

   - Use a descriptive branch name: `translation-part2`, `translation-part3`, etc.

2. Verify file placement and encoding

   - Place English files under `/translated/` and keep originals under `/original/`.
   - Filenames should be lowercase, use underscores, and end with `.md` (e.g., `full_it_lecture_notes_part2.md`).
   - Save files in UTF-8 with LF line endings if possible.

3. Preserve structure and content

   - Do NOT add explanations or new content not present in the original.
   - Keep headings, lists, tables, code blocks, and examples unchanged in order and formatting.

4. Flag unclear source items

   - If something in the source is ambiguous or looks like a typo (broken code, invalid IDs, non-standard API usages), add a short comment in the file (HTML or Markdown comment) and list it in the PR description for human review.

5. Small correctness fixes (only with permission)

   - Fix obvious typos in code snippets only if you can be certain (e.g., a missing bracket or obvious wrong port number). Otherwise, flag for review.

6. Create a useful PR description

   - List files added/changed.
   - Mention any flagged ambiguous lines and why they were flagged.
   - Include examples of expected reviewer actions (approve, ask for clarification, or provide corrected source snippet).

7. Run a quick Markdown preview

   - Use your IDE or GitHub preview to ensure tables and code blocks render correctly.

8. Suggested PowerShell commands (run locally)

```powershell
# create and switch to branch
git checkout -b translation-part2

# add translated files
git add translated/full_it_lecture_notes_part2.md translated/README.md translated/PR_CHECKLIST.md

# commit
git commit -m "Translate Part 2 to English (preserve structure); add README and PR checklist"

# push
git push -u origin translation-part2
```

9. Open PR on GitHub

   - Target branch: `main` (or whatever your repo uses for reviews)
   - Title: `Translate Part 2 to English (preserve structure)`
   - Body: paste the checklist items 4 and 6 (flagged issues + reviewer actions)

10. Follow-up

- After feedback, make requested changes in the branch and push; the PR will update automatically.
