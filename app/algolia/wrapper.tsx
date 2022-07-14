import React, { FC, ReactNode } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch(
  'EA4MJUGYGP',
  'f0d290029d20ac262462213d1c354247'
);

const AlgoliaWrapper: FC<{
  children: ReactNode;
  indexName: string;
}> = ({ children, indexName }) => {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      {children}
    </InstantSearch>
  );
};

export default AlgoliaWrapper;
