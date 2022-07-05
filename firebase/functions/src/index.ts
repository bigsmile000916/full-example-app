import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';

admin.initializeApp();

const db = firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const deleteAccount = functions
  .region('asia-noutheast1')
  .auth.user()
  .onDelete((_, context) => {
    const uid = context.auth?.uid;

    return db.doc(`users/${uid}`).delete();
  });
