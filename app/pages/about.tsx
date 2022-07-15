import { ReactElement } from 'react';
import Layout from '../components/layout';
import { NextPageWithLayout } from './_app';

const Trems: NextPageWithLayout = () => {
  return <p>サービスについて</p>;
};

export default Trems;

Trems.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
