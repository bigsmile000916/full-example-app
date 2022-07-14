import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Post } from '@shared/types/post';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/button';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import PostCard from '../components/post-card';
import { useRequireAuth } from '../lib/auth';
import { db, postCollection } from '../lib/firebase/client';
import { deletePost } from '../lib/post';
import { NextPageWithLayout } from './_app';

const Manage: NextPageWithLayout = () => {
  const { user } = useRequireAuth();
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    if (user?.id) {
      const q = query(postCollection, where('authorId', '==', user.id));
      onSnapshot(q, (snap) => {
        setPosts(snap.docs.map((doc) => doc.data()));
      });
    }
  }, [user?.id]);

  if (!user) {
    return null;
  }

  const handleDelete = (id: string) => {
    if (window.confirm('本当に削除しますか？')) {
      deletePost(id);
    }
  };

  return (
    <div className="container">
      <NextSeo title="投稿管理" />
      <PageTitle>投稿管理</PageTitle>

      {posts?.length ? (
        <ul className="">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center space-x-2">
              <Link href={`/posts/${post.id}`}>
                <a className="flex-1 hover:text-blue-500">{post.title}</a>
              </Link>
              <Link href={`/posts/${post.id}/edit`}>
                <a className="hover:text-blue-500">
                  <PencilAltIcon className="w-5 h-5" />
                </a>
              </Link>
              <button
                className="hover:text-blue-500"
                onClick={() => handleDelete(post.id)}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>まだ記事がありません。</p>
          <Button href="/new">投稿</Button>
        </div>
      )}
    </div>
  );
};

export default Manage;

Manage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
