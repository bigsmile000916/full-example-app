import { PlayIcon } from '@heroicons/react/solid';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ReactElement } from 'react';
import Layout from '../components/layout';
import PostCard from '../components/post-card';
import TrendUserList from '../components/trend-user-list';
import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    revalidate: 1000,
    props: {
      trendPosts: [],
      trendUsers: [],
    },
  };
};

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ trendPosts, trendUsers }) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="aspect-[16/6] bg-[url(https://cdn.pixabay.com/photo/2021/05/14/08/44/running-6252827_1280.jpg)] bg-cover bg-center rounded-3xl relative flex items-center px-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-700"></div>
          <div className="relative z-10">
            <h2 className="text-white font-bold text-4xl mb-8">
              Lorem ipsum dolor sit.
            </h2>
            <div className="space-x-4 flex">
              <button className="font-bold flex items-center text-xl bg-white rounded-full py-3 px-8 text-blue-500 tracking-wide">
                <span className="mr-2">Play</span>
                <PlayIcon className="w-7 h-7 -mr-3" />
              </button>
              <button className="text-xl border border-white text-white rounded-full py-3 px-8 tracking-wide">
                Discover
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="w-2 h-2 rounded-full bg-slate-800"></span>
          <span className="w-2 h-2 rounded-full bg-slate-800"></span>
        </div>

        <div className="flex items-center mt-8 mb-6">
          <h2 className="text-slate-200 font-bold text-2xl flex-1">Trend</h2>
          <ul className="flex items-center text-slate-500">
            <li>
              <button className="p-2 rounded-full hover:bg-slate-800 min-w-[80px]">
                All
              </button>
            </li>
            <li>
              <button className="p-2 rounded-full hover:bg-slate-800 min-w-[80px]">
                Art
              </button>
            </li>
            <li>
              <button className="p-2 rounded-full hover:bg-slate-800 min-w-[80px]">
                Game
              </button>
            </li>
            <li>
              <button className="p-2 rounded-full hover:bg-slate-800 min-w-[80px]">
                Tech
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
      <div className="col-span-1">
        <div className="top-6 sticky">
          <div className="bg-slate-800 rounded-2xl p-8">
            <h2 className="font-bold text-white text-2xl mb-6">Users</h2>
            <TrendUserList />
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
