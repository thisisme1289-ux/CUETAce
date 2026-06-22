# CUETAce Firebase Paid Profile Setup

This repo now includes the Firebase architecture for student profiles and secure server-side question delivery. Razorpay payment backend code is scaffolded, but the visible app payment UI is intentionally deferred until profiles are working.

## 1. Create Firebase Project

1. Create a Firebase project and enable Blaze with a budget alert.
2. Enable Authentication > Email/Password > Email link sign-in.
3. Optional but recommended: enable Authentication > Google for one-tap style student login.
3. Enable Firestore, Cloud Storage, Hosting, and Cloud Functions.
4. Copy `.firebaserc.example` to `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID`.

## 2. Configure Frontend

In `index.html`, replace the placeholder `CUETACE_FIREBASE_CONFIG` values with the Firebase web app config from Project settings.

Keep `enabled: false` until Functions and question uploads are ready. Change it to `true` for production Firebase-backed attempts.

## 3. Configure Functions

Copy `functions/.env.example` to `functions/.env`. For profile-only testing, Firebase can run without Razorpay keys. Fill Razorpay values only when payment testing starts:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `PUBLIC_APP_URL`
- `QUESTION_BUCKET`

Deploy:

```bash
npm install
npm --prefix functions install
firebase deploy --only functions,firestore:rules,storage:rules
```

When payment work resumes, set the Razorpay webhook URL to:

```text
https://asia-south1-YOUR_FIREBASE_PROJECT_ID.cloudfunctions.net/razorpayWebhook
```

Listen for `payment_link.paid`.

## Profile-First Milestone

For now, use the app's Profile button to test:

- Firebase config loads.
- Email magic-link login works.
- Google login works if the Google provider is enabled.
- `users/{uid}` is created.
- Name, phone, class, target year, and city save through `syncProfile`.

When a student tries to open Dashboard/Test before login, CUETAce stores the intended destination locally. After email-link or Google sign-in succeeds, the app continues to that pending destination automatically.

The payment button is hidden in the frontend until the Razorpay flow is ready.

## 4. Upload Question Bank

```bash
npm run build:question-index
$env:QUESTION_BUCKET='YOUR_FIREBASE_PROJECT_ID.appspot.com'
$env:GOOGLE_APPLICATION_CREDENTIALS='C:\path\to\service-account.json'
npm run upload:questions
```

Question JSON files are uploaded privately under `question-bank/`. Students cannot read them directly; Cloud Functions return only active-test-safe fields.

## 5. Security Expectations

- Active attempts must never include `correct` or `explanation` in network responses.
- `submitAttempt` scores on the server using the hidden attempt snapshot.
- Firestore results and bookmarks are user-scoped.
- Storage question bundles are denied to all client reads.

## 6. Cost Controls

- Add a Firebase budget alert before enabling production traffic.
- Keep question bundles in Storage, not Firestore documents, to avoid high read counts.
- Fetch one full attempt batch upfront to reduce repeated Function calls.
