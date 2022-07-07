import { Contact } from '@shared/types/contact';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/button';
import Input from '../components/input';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import TextArea from '../components/textarea';
import { formErrorMessages } from '../lib/validate';
import { NextPageWithLayout } from './_app';

const ContactPage: NextPageWithLayout = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Contact>();

  const submit = (data: Contact) => {
    console.log(data);
  };

  return (
    <div className="container">
      <PageTitle>Contact</PageTitle>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <Input
          label="Name"
          autoComplete="name"
          type="text"
          errors={errors}
          {...register('name', {
            required: 'required',
          })}
        />

        <Input
          label="Email"
          autoComplete="email"
          type="text"
          errors={errors}
          {...register('email', {
            required: 'required',
          })}
        />

        <TextArea
          label="Body"
          currentLength={watch('body')?.length}
          limitLength={400}
          {...register('body', {
            required: 'required',
            maxLength: formErrorMessages.maxLength(400),
          })}
        />

        <Button disabled={isSubmitting}>Submit</Button>
      </form>
    </div>
  );
};

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ContactPage;
