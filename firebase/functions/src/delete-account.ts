import { db, fns } from './lib/firebase';

export const deleteAccount = fns.auth.user().onDelete((_, context) => {
  const uid = context.auth?.uid;

  return db.doc(`users/${uid}`).delete();
});
