import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import DeleteAccountForm from '../components/delete-account-form';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import { NextPageWithLayout } from './_app';

const Settings: NextPageWithLayout = () => {
  return (
    <div className="container">
      <NextSeo title="設定" />
      <PageTitle>設定</PageTitle>

      <div className="space-y-10">
        <div>{/* <NewsletterSettings /> */}</div>
        <div>
          <DeleteAccountForm />
        </div>
      </div>
    </div>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
