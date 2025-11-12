# Translated Lecture Notes

This folder contains English IT lecture notes.

Repository suggestions

- /original/ — keep the original Russian Markdown files (one-to-one with the source)
- /translated/ — English translations (file names lowercase with underscores)
- README.md at the repository root should link original and translated files for review

Branch and commit recommendations

- Suggested branch name for translations: `translation-part3` (use `translation-partX` for other parts)
- Suggested commit message for Part 3: `Translate Part 3 to English (preserve structure)`

Notes

- Files are saved in UTF-8.
- Keep Markdown structure identical (headings, lists, tables, code blocks).
- If any text is unclear, flag it for human review rather than guessing.

How to review locally (PowerShell)

```powershell
# switch to the branch
git checkout -b translation-part3
# add files
git add translated/full_it_lecture_notes_part3.md translated/README.md
git commit -m "Translate Part 3 to English (preserve structure)"
git push -u origin translation-part3
```
