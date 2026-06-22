# CUETAce Question Cleanup Plan

## Goal

Clean and normalize the question data across every subject, chapter, and paper without deleting existing content, and make the website renderer display every supported question field that exists in the data.

This is a broad bank-level task, not a one-chapter fix.

## Current Evidence

Baseline command:

```powershell
node scripts/audit-questions.mjs questions
```

Current audit summary:

- JSON files scanned: 58
- Questions found: 11,430
- Parse errors: 0
- Shape issues: 0
- Missing required fields: 0
- Correct-index issues: 0
- Suspicious keys: 0

Structural fields currently present:

- `passage`: 202 questions
- `sentence`: 400 questions
- `statements`: 200 questions
- `column_i` / `column_ii`: 200 questions

Important examples:

- `questions/english/EN-S1.json` uses `passage`, but passage visibility depends on the website mapping and renderer.
- `questions/english/EN-S2.json` uses `statements` for para-jumbles.
- `questions/english/EN-S3.json` uses `column_i` and `column_ii` for match-the-following.
- `questions/english/EN-S4.json` and `questions/english/EN-S5.json` use `sentence`.
- `questions/2025-questions.json` uses a nested `chapters[].questions[]` format.
- `questions/accountancy/AC01.json` question `AC01Q65` was missing `correct` and `explanation`; this was repaired by preserving the old prompt as `original_question`, correcting the displayed prompt to match the available options, and adding a worked explanation.
- `questions/general-test/GT-S2.json` question `GT-S2Q162` had `difficulty ` with trailing whitespace; this was normalized to `difficulty` and preserved as `difficulty_legacy_key`.
- 584 questions had `correct` equal to the number of options, which strongly suggested 1-based answer indexes. These were normalized to 0-based indexes and preserved as `correct_original`.

## Data Contract

Every question should preserve its original content while also being readable through a consistent normalized shape:

```js
{
  id,
  subject,
  chapter,
  chapter_id,
  type,
  level,
  difficulty,
  question,
  options,
  correct,
  explanation,
  passage,
  sentence,
  statements,
  column_i,
  column_ii,
  image,
  table,
  data
}
```

Fields that do not apply to a question may be absent or empty. Existing fields must not be deleted just because the current UI does not use them yet.

## Website Renderer Contract

The website should render the normalized fields like this:

- `passage`: show a passage/case-study panel for any subject, not only English.
- `sentence`: show the sentence block before the question.
- `statements`: show statement rows for statement-based questions and ordered rows for para-jumbles.
- `column_i` + `column_ii`: show a two-column match-list layout.
- `image`: show visual content when present.
- `table` / `data`: show a compact table/data block when present.
- `question`: always show as the main prompt.
- `options`: always show as selectable answer options.
- `explanation`: show after answer selection when explanations are enabled.

## Implementation Plan

1. Audit and classify the entire question bank.
   - Keep `scripts/audit-questions.mjs` as the baseline checker.
   - Extend it when new supported fields appear.
   - Output counts by file, subject, type, required-field issues, structural fields, and answer-index problems.

2. Strengthen the website normalizer.
   - Done: `apiQToExamQ` maps every known display field.
   - Done: aliases such as `paragraph`, `context`, or `case_study` become displayable `passage`.
   - Done: `type` names such as `statement_based`, `match_following`, `rc_based`, and `case_based` normalize before rendering.
   - Done: `correct` is normalized safely at runtime so 1-based indexes do not break scoring or highlighting.

3. Strengthen the renderer.
   - Done: removed the English-only passage rule.
   - Done: passage/case-study/context blocks render wherever the question has that content.
   - Done: data/table fields render through a compact structured block.
   - Done: current UI blocks remain for statements, para-jumbles, match-list, sentence, and visual questions.

4. Clean data non-destructively.
   - Done: malformed `difficulty ` keys were normalized.
   - Done: `AC01Q65` now has a verified answer and explanation, with the original prompt preserved.
   - Done: unambiguous 1-based answer indexes were rewritten while preserving originals in `correct_original`.
   - Done: original wording, options, explanations, passages, and metadata were preserved.

5. Verify across all subjects.
   - Done: audit rerun after cleanup.
   - Done: renderer smoke-tested with representative passage, sentence, statements/para-jumble, match-list, and table/data examples.
   - Done: saved questions now preserve structural fields such as passage, sentence, statements, match-list columns, image, table, and data.
   - Done: broader browser walkthrough covered representative questions from Accountancy, Business Studies, Economics, General Test, and English.

## Completion Criteria

The goal is complete only when:

- All 58 JSON files parse.
- The audit reports no accidental shape loss.
- Known structural fields are represented by the website renderer.
- No question with valid structural content silently drops that content in the exam view.
- Correct-answer indexes are safe for scoring and highlighting.
- Saved questions retain the same visible context as the original exam question.
- Verification covers all subjects, not just English.
