import { ReactElement } from 'react';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import { NextPageWithLayout } from './_app';

const News: NextPageWithLayout = () => {
  return (
    <div className="container">
      <PageTitle>News</PageTitle>
    </div>
  );
};

export default News;

News.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
