import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Avatar from '../../components/avatar';
import Layout from '../../components/layout';
import PageTitle from '../../components/page-title';
import { useRequireAuth } from '../../lib/auth';
import { NextPageWithLayout } from '../_app';

const tabs = [
  {
    label: 'Posts',
    href: 'posts',
  },
  {
    label: 'Likes',
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
      <div className="bg-black aspect-[16/4]"></div>

      <div className="container">
        <div className="flex items-center -mt-2 mb-6">
          <div className="rounded-full bg-slate-900 p-1">
            <Avatar src={user.photoUrl} size="xl" />
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-slate-500">@{user.handleName}</p>
          </div>
          <button className="px-4 py-2 rounded-full border-2 border-slate-800 hover:bg-blue-500">
            Edit Profile
          </button>
        </div>

        <p>{user.description}</p>

        <div className="flex space-x-4 mb-6">
          <p>
            <span className="font-bold mr-2">{user.followCount}</span>
            <span className="text-slate-500">Following</span>
          </p>
          <p>
            <span className="font-bold mr-2">{user.followerCount}</span>
            <span className="text-slate-500">Followers</span>
          </p>
        </div>

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
          <Tab.Panels className="p-4">
            <Tab.Panel>posts</Tab.Panel>
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
