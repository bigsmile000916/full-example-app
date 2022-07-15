import * as sgMail from '@sendgrid/mail';

export const getMailClient = (): sgMail.MailService => {
  sgMail.setApiKey(process.env.SENDGRID_KEY as string);
  return sgMail;
};
