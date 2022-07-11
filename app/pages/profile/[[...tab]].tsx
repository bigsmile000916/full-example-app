import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import Layout from '../../components/layout';
import UsersPostList from '../../components/users-post-list';
import { useRequireAuth } from '../../lib/auth';
import { NextPageWithLayout } from '../_app';

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

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { user } = useRequireAuth();
  const activeIndex = tabs.findIndex(
    (tab) => tab.href === router.query.tab?.[0]
  );

  if (!router.isReady || !user) {
    return null;
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
          <div className="rounded-full bg-slate-900 p-1">
            <Avatar src={user.photoUrl} size="xl" />
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-slate-500">@{user.handleName}</p>
          </div>
          <Button href="/profile/edit">編集</Button>
        </div>

        <p className="mb-6">{user.description}</p>

        <Tab.Group
          selectedIndex={activeIndex}
          onChange={(i) => router.replace(`/profile/${tabs[i].href}`)}
        >
          <Tab.List className="border-b border-slate-700">
            {tabs.map((tab) => (
              <Tab
                key={tab.label}
                className={({ selected }) =>
                  classNames(
                    'px-4 py-2 rounded-t-md',
                    selected && 'bg-slate-800'
                  )
                }
              >
                {tab.label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="py-4">
            <Tab.Panel>
              <UsersPostList />
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
