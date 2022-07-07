import { Post } from '@shared/types/post';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactElement } from 'react';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import PostCard from '../components/post-card';
import { adminDB } from '../lib/firebase/server';
import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = async (context) => {
  const snap = await adminDB
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .get();
  const posts = snap.docs.map((doc) => doc.data() as Post);

  return {
    revalidate: 60,
    props: {
      posts,
    },
  };
};

const News: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  return (
    <div className="container">
      <PageTitle>News</PageTitle>

      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default News;

News.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
