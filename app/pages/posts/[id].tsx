import { Post } from '@shared/types/post';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import Layout from '../../components/layout';
import { useAuth } from '../../context/auth';
import { adminDB } from '../../lib/firebase/server';
import { useUser } from '../../lib/user';
import { NextPageWithLayout } from '../_app';

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  post: Post | null;
}> = async (context) => {
  const snap = await adminDB.doc(`posts/${context.params?.id}`).get();

  return {
    revalidate: 60,
    props: {
      post: (snap.data() as Post) || null,
    },
  };
};

const PostDetail: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
  const { user } = useAuth();
  const { user: author } = useUser(post?.authorId);

  if (!post) {
    return (
      <p className="container text-center my-20 text-slate-400">
        該当の記事は存在しません
      </p>
    );
  }

  if (!author) {
    return null;
  }

  return (
    <div className="container">
      <NextSeo title={post.title} />

      {post.authorId == user?.id && (
        <div className="text-right mb-4">
          <Button level="secondary" href={`/posts/${post.id}/edit`}>
            編集
          </Button>
        </div>
      )}
      <div className="relative mb-6">
        {post.coverUrl ? (
          <img
            className="rounded-lg mb-6 block w-full"
            src={post.coverUrl}
            alt=""
          />
        ) : (
          <span className="aspect-[4/1] w-full block" />
        )}

        <div className="absolute rounded-lg bottom-0 top-0 inset-x-0 from-black bg-gradient-to-tr" />

        <div className="absolute bottom-6 inset-x-6">
          <h1 className="font-bold text-2xl mb-4 text-white">{post.title}</h1>
          <div className="flex items-center">
            <div className="rounded-full p-1 bg-slate-200">
              <Avatar src={author.photoUrl} size="lg" />
            </div>
            <div className="flex-1 ml-4">
              <p className="text-lg">{author.name}</p>
              <p className="opacity-80">
                {format(post.updatedAt || post.createdAt, 'yyyy年MM月dd日')}{' '}
                {post.updatedAt ? '更新' : '作成'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p>{post.body}</p>
    </div>
  );
};

export default PostDetail;

PostDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
