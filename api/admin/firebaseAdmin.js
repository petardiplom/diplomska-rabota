import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { readFileSync } from 'fs';

dotenv.config();


const serviceAccountPath = path.resolve(process.cwd(), process.env.FIREBASE_KEY_PATH);

const serviceAccountJSON = readFileSync(serviceAccountPath, 'utf8');
const serviceAccount = JSON.parse(serviceAccountJSON);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;