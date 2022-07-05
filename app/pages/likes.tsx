import { ReactElement } from 'react';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import { NextPageWithLayout } from './_app';

const Likes: NextPageWithLayout = () => {
  return (
    <div className="container">
      <PageTitle>Likes</PageTitle>
    </div>
  );
};

export default Likes;

Likes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
