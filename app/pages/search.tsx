import { Post } from '@shared/types/post';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useHits, Configure, Pagination } from 'react-instantsearch-hooks-web';
import AlgoliaWrapper from '../algolia/wrapper';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import PostCard from '../components/post-card';
import { NextPageWithLayout } from './_app';

const SearchResults = () => {
  const router = useRouter();
  const { hits, results } = useHits<Post>();

  return (
    <div>
      <div className="text-center">
        <PageTitle>「{router.query.query}」の検索結果</PageTitle>
      </div>
      <p className="text-center mb-4 text-sm text-slate-400">
        {results?.nbHits}件見つかりました
      </p>
      <div className="space-y-4">
        {hits?.length ? (
          hits.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center my-10 text-slate-400">
            検索結果が見つかりませんでした
          </p>
        )}
      </div>
    </div>
  );
};

const Search: NextPageWithLayout = () => {
  const router = useRouter();

  if (!router.query.query) {
    return null;
  }

  return (
    <div className="container max-w-md">
      <AlgoliaWrapper indexName="posts">
        <Configure query={router.query.query as string} hitsPerPage={20} />
        <SearchResults />
        <div className="mt-4">
          <Pagination
            classNames={{
              list: 'flex items-center space-x-4 justify-center',
              item: 'p-1',
              disabledItem: 'opacity-30',
            }}
          />
        </div>
      </AlgoliaWrapper>
    </div>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
