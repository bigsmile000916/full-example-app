import { Post } from '@shared/types/post';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import PageTitle from '../../../components/page-title';
import PostForm from '../../../components/post-form';
import { useRequireAuth } from '../../../lib/auth';
import { getPost } from '../../../lib/post';
import { NextPageWithLayout } from '../../_app';

const PostDetail: NextPageWithLayout = () => {
  const { user } = useRequireAuth();
  const router = useRouter();
  const [post, setPost] = useState<Post>();

  const id = router.query?.id;

  useEffect(() => {
    if (id) {
      getPost(id as string).then((post) => {
        setPost(post);
      });
    }
  }, [id]);

  if (!user || !post) {
    return null;
  }

  return (
    <div className="container">
      <NextSeo title={`${post.title} - 編集`} />
      <PageTitle>記事編集</PageTitle>
      <PostForm post={post} />
    </div>
  );
};

export default PostDetail;

PostDetail.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
