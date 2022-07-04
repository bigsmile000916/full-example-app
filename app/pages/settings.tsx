import React, { ReactElement } from 'react';
import DeleteAccountForm from '../components/delete-account-form';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import { NextPageWithLayout } from './_app';

const Settings: NextPageWithLayout = () => {
  return (
    <div>
      <PageTitle>Settings</PageTitle>

      <DeleteAccountForm />
    </div>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
