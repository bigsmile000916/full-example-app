import { Tab } from '@headlessui/react';
import { User } from '@shared/types/user';
import classNames from 'classnames';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Avatar from '../../../components/avatar';
import Button from '../../../components/button';
import Layout from '../../../components/layout';
import UsersPostList from '../../../components/users-post-list';
import { adminDB } from '../../../lib/firebase/server';
import { NextPageWithLayout } from '../../_app';

const tabs = [
  {
    label: '投稿',
    href: 'posts',
  },
  {
    label: 'いいね',
    href: 'likes',
  },
];

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  user: User | null;
}> = async (context) => {
  const snap = await adminDB.doc(`users/${context.params?.userId}`).get();

  return {
    revalidate: 60,
    props: {
      user: (snap.data() as User) || null,
    },
  };
};

const Profile: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ user }) => {
  const router = useRouter();
  const activeIndex = tabs.findIndex(
    (tab) => tab.href === router.query.tab?.[0]
  );

  if (!user) {
    return (
      <p className="container text-slate-600 text-center my-20">
        該当のユーザーは存在しません
      </p>
    );
  }

  return (
    <div>
      <NextSeo title="プロフィール" />
      <div className="bg-black aspect-[16/4]">
        {user.coverUrl && (
          <img
            src={user.coverUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <div className="container">
        <div className="flex items-center -mt-2 mb-4">
          <div className="rounded-full dark:bg-slate-900 bg-slate-100 p-1">
            <Avatar src={user.photoUrl} size="xl" />
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-slate-500">
              {format(user.createdAt, 'yyyy年MM月dd日作成')}
            </p>
          </div>
          <Button
            level="secondary"
            href="/profile/edit"
            className="hidden lg:block"
          >
            編集
          </Button>
        </div>

        <p className="mb-6">{user.description}</p>

        <Tab.Group
          selectedIndex={activeIndex}
          onChange={(i) => router.replace(`/users/${user.id}/${tabs[i].href}`)}
        >
          <Tab.List className="border-b dark:border-slate-700">
            {tabs.map((tab) => (
              <Tab
                key={tab.label}
                className={({ selected }) =>
                  classNames(
                    'px-4 py-2 rounded-t-md',
                    selected && 'dark:bg-slate-800 bg-slate-200'
                  )
                }
              >
                {tab.label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="py-4">
            <Tab.Panel>
              <UsersPostList userId={user.id} />
            </Tab.Panel>
            <Tab.Panel>likes</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
