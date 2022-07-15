import { Contact } from '@shared/types/contact';
import { fns, logger } from './lib/firebase';
import { getMailClient } from './lib/sendgrid';

import * as functions from 'firebase-functions';

export const sendContact = fns
  .runWith({ secrets: ['SENDGRID_KEY'] })
  .https.onCall((data: Contact) => {
    const msg = {
      to: 'd20200720@gmail.com',
      from: 'd20200720@gmail.com',
      subject: `お問い合わせ: ${data.title}`,
      text: data.body + `\n\nfrom ${data.email}`,
    };

    return getMailClient()
      .send(msg)
      .catch((e) => {
        logger.error(e.message);
        throw new functions.https.HttpsError('invalid-argument', e);
      });
  });
