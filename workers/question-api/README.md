# CUETAce Question API Worker

Deploy `worker.js` to:

`https://question.thisisme1289.workers.dev`

The website can use this Worker to fetch only the current nearby question window instead of downloading full chapter/mock/past-year files in the browser.

## Endpoints

### `GET /health`

Checks whether the Worker is live.

Example:

`/health`

Response:

```json
{ "ok": true, "ts": 1783163129220, "version": "2026-07-secure-windowed" }
```

### `GET /manifest`

Returns available subjects and chapter slugs.

Example:

`/manifest`

### `GET /questions`

Returns a deterministic live-exam window of questions. This endpoint intentionally does **not** return `correct` or `explanation`.

Common query parameters:

- `mode`: `chapter`, `mock`, or `pyp`
- `subject`: `Accountancy`, `Business Studies`, `Economics`, `General Test`, or `English`
- `count`: total questions in this attempt
- `seed`: stable attempt seed; same seed returns the same order
- `windowStart`: zero-based first question index to return
- `windowSize`: number of nearby questions to return, recommended `9`
- `shuffle`: `1` by default, use `0` to keep source order

Chapter mode:

`/questions?mode=chapter&subject=Accountancy&chapter=AC01&count=50&seed=abc123&windowStart=0&windowSize=9`

Mock mode:

`/questions?mode=mock&subject=Accountancy&count=50&seed=abc123&windowStart=0&windowSize=9`

Past-year mode:

`/questions?mode=pyp&subject=Business%20Studies&year=2025&count=200&seed=abc123&windowStart=0&windowSize=9`

Past-year exact source path:

`/questions?mode=pyp&subject=Business%20Studies&sourcePath=questions/past-year/aggregate/2025/business-studies.json&seed=abc123&windowStart=0&windowSize=9`

Response shape:

```json
{
  "ok": true,
  "total": 50,
  "mode": "mock",
  "subject": "Accountancy",
  "meta": {
    "mode": "mock",
    "subject": "Accountancy"
  },
  "access": {
    "solutionsIncluded": false,
    "solutionEndpoint": "/solutions"
  },
  "window": {
    "start": 0,
    "size": 9,
    "requestedStart": 0,
    "requestedSize": 9
  },
  "questions": []
}
```

### `GET /solutions`

Returns the answer key and explanations for a submitted Worker-powered attempt. This endpoint is protected and requires:

`Authorization: Bearer <Firebase ID token>`

Use the same attempt parameters as `/questions`:

- `mode`
- `subject`
- `chapter`, `year`, `paper`, `packId`, or `sourcePath` when applicable
- `count`
- `seed`
- `solutionStart`
- `solutionSize`

Example:

`/solutions?mode=mock&subject=Accountancy&count=50&seed=abc123&solutionStart=0&solutionSize=50`

Response shape:

```json
{
  "ok": true,
  "total": 50,
  "window": { "start": 0, "size": 50 },
  "solutions": [
    { "index": 0, "id": "123", "correct": 2, "explanation": "..." }
  ]
}
```

Cloudflare environment variable:

- `FIREBASE_PROJECT_ID=cuet-d3dea`

## How Website Fetching Works

1. When an exam starts, the website builds an attempt seed.
2. It requests only a small question window from the Worker, normally 9 questions around the current position.
3. As the student moves through the exam, missing nearby questions are fetched from the Worker.
4. Answers, status, timer, and the API attempt metadata are saved locally.
5. The browser does not store the full question bank for Worker-powered exams.
6. On submit, the website fetches any missing question text windows, then requests `/solutions` with the Firebase ID token for scoring and review.
7. The frontend no longer falls back to raw GitHub question files for normal exams, because those files include answer keys.

## Current Repo Structure Used By Worker

Chapter files:

`questions/{subject-folder}/{chapter}.json`

Past-year index:

`questions/question-bank-index.json`

Ready past-year files:

`questions/past-year/aggregate/...`

`questions/past-year/individual/...`

`questions/past-year/import-packs/...`

The Worker does not use old paths like `questions/2025-accountancy.json`.
