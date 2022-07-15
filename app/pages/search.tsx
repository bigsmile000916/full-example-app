import { Post } from '@shared/types/post';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import {
  Configure,
  Hits,
  Pagination,
  RefinementList,
  SortBy,
  useInstantSearch,
} from 'react-instantsearch-hooks-web';
import AlgoliaWrapper from '../algolia/wrapper';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import PostCard from '../components/post-card';
import SearchBox from '../components/search-box';
import { getCategoryLabel } from '../lib/post';
import { NextPageWithLayout } from './_app';

const SearchResults = () => {
  const { results } = useInstantSearch();

  return (
    <div>
      {results?.query && (
        <div className="text-center mb-6">
          <PageTitle>「{results.query}」の検索結果</PageTitle>
          {results?.nbHits ? (
            <p className="text-sm text-slate-400">
              {results?.nbHits}件見つかりました
            </p>
          ) : (
            <p className="text-center my-10 text-slate-400">
              検索結果が見つかりませんでした
            </p>
          )}
        </div>
      )}

      <Hits<Post>
        classNames={{
          list: 'space-y-4',
        }}
        hitComponent={({ hit }) => <PostCard post={hit} />}
      />
    </div>
  );
};

const Search: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <div className="container">
      <div className="lg:hidden mb-6">
        <SearchBox />
      </div>

      <AlgoliaWrapper indexName="posts">
        <Configure query={router.query.q as string} hitsPerPage={20} />

        <div className="lg:grid gap-6 grid-cols-3">
          <div className="col-span-2">
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
          </div>
          <div className="col-span-1 space-y-6">
            <div>
              <h2 className="mb-4">並び替え</h2>
              <SortBy
                classNames={{
                  select: 'rounded border bg-transparent w-full',
                }}
                items={[
                  {
                    label: '新着順',
                    value: 'posts',
                  },
                  {
                    label: '古い順',
                    value: 'posts_createdAt_asc',
                  },
                ]}
              />
            </div>

            <div>
              <h2 className="mb-4">カテゴリ</h2>
              <RefinementList
                transformItems={(items) => {
                  return items.map((item) => {
                    return {
                      ...item,
                      label: getCategoryLabel(item.value),
                    };
                  });
                }}
                classNames={{
                  checkbox: 'rounded border bg-transparent mr-2',
                  label: 'flex items-center',
                  labelText: 'flex-1',
                  count: 'ml-2',
                  list: 'space-y-1',
                }}
                attribute="category"
              />
            </div>
          </div>
        </div>
      </AlgoliaWrapper>
    </div>
  );
};

export default Search;

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
