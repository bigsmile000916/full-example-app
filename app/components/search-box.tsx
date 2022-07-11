import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';

const SearchBox = () => {
  return (
    <form className="rounded-md bg-slate-800 w-96 flex items-center px-3 focus-within:ring-2">
      <SearchIcon className="w-5 h-5 text-slate-400" />
      <input
        type="text"
        className="border-none bg-transparent flex-1 focus:ring-0 text-slate-200"
        placeholder="検索"
        autoComplete="off"
      />
    </form>
  );
};

export default SearchBox;
