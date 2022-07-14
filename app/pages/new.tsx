import { ReactElement } from 'react';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import PostForm from '../components/post-form';
import { NextPageWithLayout } from './_app';

const New: NextPageWithLayout = () => {
  return (
    <div className="container">
      <PageTitle>投稿</PageTitle>
      <PostForm />
    </div>
  );
};

export default New;

New.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
