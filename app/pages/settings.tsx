import { NextSeo } from 'next-seo';
import React, { ReactElement } from 'react';
import DeleteAccountForm from '../components/delete-account-form';
import Layout from '../components/layout';
import NewsletterSettings from '../components/newsletter-settings';
import PageTitle from '../components/page-title';
import { NextPageWithLayout } from './_app';

const Settings: NextPageWithLayout = () => {
  return (
    <div className="container">
      <NextSeo title="設定" />
      <PageTitle>Settings</PageTitle>

      <div>
        <NewsletterSettings />
        <DeleteAccountForm />
      </div>
    </div>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
