import { ReactElement } from 'react';
import Layout from '../../components/layout';
import PageTitle from '../../components/page-title';
import UserForm from '../../components/user-form';
import { useRequireAuth } from '../../lib/auth';
import { NextPageWithLayout } from '../_app';

const Edit: NextPageWithLayout = () => {
  const { user } = useRequireAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <PageTitle>プロフィール編集</PageTitle>
      <UserForm mode="edit" user={user} />
    </div>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
