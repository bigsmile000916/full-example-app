import { Post } from '@shared/types/post';
import { User } from '@shared/types/user';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactElement } from 'react';
import Layout from '../components/layout';
import PostCard from '../components/post-card';
import TrendSlide from '../components/trend-slide';
import TrendUserList from '../components/trend-user-list';
import { mockTrendPosts } from '../lib/mock';
import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps<{
  trendPosts: Post[];
  trendUsers: User[];
}> = async (context) => {
  return {
    revalidate: 6000,
    props: {
      trendPosts: mockTrendPosts,
      trendUsers: [],
    },
  };
};

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ trendPosts }) => {
  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 xl:col-span-2">
          <TrendSlide />

          <div className="flex items-center mt-8 mb-6">
            <h2 className="text-slate-200 font-bold text-2xl flex-1">
              人気の記事
            </h2>
            <ul className="flex items-center text-slate-500">
              <li>
                <button className="p-2 rounded-full hover:bg-slate-800 min-w-[80px]">
                  すべて
                </button>
              </li>
              <li>
                <button className="p-2 rounded-full hover:bg-slate-800 min-w-[80px]">
                  テクノロジー
                </button>
              </li>
              <li>
                <button className="p-2 rounded-full hover:bg-slate-800 min-w-[80px]">
                  エンタメ
                </button>
              </li>
              <li>
                <button className="p-2 rounded-full hover:bg-slate-800 min-w-[80px]">
                  政治
                </button>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {trendPosts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1">
          <div className="top-6 sticky">
            <div className="bg-slate-800 rounded-2xl p-8">
              <h2 className="font-bold text-white text-lg mb-6">
                最近参加したユーザー
              </h2>
              <TrendUserList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
