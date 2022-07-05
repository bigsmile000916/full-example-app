import { initializeApp, getApps } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBtuJWJr6jQO5J5BuG7bJfqRqUTvyY-s0A',
  authDomain: 'full-example.firebaseapp.com',
  projectId: 'full-example',
  storageBucket: 'full-example.appspot.com',
  messagingSenderId: '814517065766',
  appId: '1:814517065766:web:1b903b2144164c030eaee7',
  measurementId: 'G-92ER7GLHCL',
};

export let ga: Analytics;

if (!getApps().length) {
  initializeApp(firebaseConfig);
  if (typeof window !== 'undefined' && 'measurementId' in firebaseConfig) {
    ga = getAnalytics();
  }
}

export const db = getFirestore();
export const functions = getFunctions();
export const auth = getAuth();
export const storage = getStorage();
