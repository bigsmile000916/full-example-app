import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';

export const fns = functions.region('asia-northeast1');
export const db = firestore();
export const logger = functions.logger;
