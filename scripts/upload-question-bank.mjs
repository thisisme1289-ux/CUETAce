import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const root = process.cwd();
const indexPath = path.join(root, 'question-bank-index.json');
const bucketName = process.env.QUESTION_BUCKET;
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!bucketName) {
  console.error('Set QUESTION_BUCKET before running upload:questions.');
  process.exit(1);
}

const credential = serviceAccountPath
  ? cert(JSON.parse(await fs.readFile(serviceAccountPath, 'utf8')))
  : applicationDefault();

initializeApp({ credential, storageBucket: bucketName });

const db = getFirestore();
const bucket = getStorage().bucket(bucketName);

async function ensureIndex() {
  try {
    return JSON.parse(await fs.readFile(indexPath, 'utf8'));
  } catch {
    console.error('Missing question-bank-index.json. Run npm run build:question-index first.');
    process.exit(1);
  }
}

const index = await ensureIndex();

for (const entry of index.entries) {
  const sourceAbs = path.join(root, entry.sourcePath);
  await bucket.upload(sourceAbs, {
    destination: entry.storagePath,
    metadata: {
      contentType: 'application/json',
      cacheControl: 'private,no-store'
    }
  });

  const docId = `${entry.mode}_${entry.subjectSlug}_${entry.chapterId || entry.paper || entry.year}`;
  await db.collection('questionIndexes').doc(docId).set({
    ...entry,
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });

  console.log(`Uploaded ${entry.sourcePath} -> gs://${bucketName}/${entry.storagePath}`);
}

console.log(`Uploaded ${index.entries.length} question bundles.`);
