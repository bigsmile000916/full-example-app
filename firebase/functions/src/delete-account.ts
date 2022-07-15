import { db, fns } from './lib/firebase';

export const deleteAccount = fns.auth.user().onDelete(async (_, context) => {
  const uid = context.auth?.uid;

  const snap = await db.collection('posts').where('authorId', '==', uid).get();
  const tasks = snap.docs.map((doc) => doc.ref.delete());

  return Promise.all(tasks);
});
