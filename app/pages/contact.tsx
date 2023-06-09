import { Contact } from '@shared/types/contact';
import { httpsCallable } from 'firebase/functions';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../components/button';
import Input from '../components/input';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import TextArea from '../components/textarea';
import { functions } from '../lib/firebase/client';
import { formErrorMessages } from '../lib/validate';
import { NextPageWithLayout } from './_app';

const ContactPage: NextPageWithLayout = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Contact>();

  const submit = (data: Contact) => {
    const callable = httpsCallable<Contact>(functions, 'sendContact');
    return callable(data)
      .then(() => {
        toast.success('送信しました');
        reset();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      <PageTitle>お問合せ</PageTitle>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <Input
          label="名前"
          autoComplete="name"
          name="name"
          defaultValue=""
          control={control}
          rules={{ required: formErrorMessages.required }}
        />

        <Input
          label="メールアドレス"
          autoComplete="email"
          type="text"
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: formErrorMessages.required,
          }}
        />

        <Input
          label="タイトル"
          autoComplete="off"
          name="title"
          defaultValue=""
          control={control}
          rules={{ required: formErrorMessages.required }}
        />

        <TextArea
          label="内容"
          name="body"
          defaultValue=""
          control={control}
          rows={10}
          rules={{
            required: formErrorMessages.required,
            maxLength: formErrorMessages.maxLength(400),
          }}
        />

        <Button disabled={isSubmitting}>送信</Button>
      </form>
    </div>
  );
};

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ContactPage;
