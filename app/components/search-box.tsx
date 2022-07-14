import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type FormData = {
  query: string;
};

const SearchBox = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormData>();

  const search = ({ query }: FormData) => {
    if (query) {
      router.push(`/search?query=${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(search)}
      className="rounded-md bg-slate-800 w-96 flex items-center px-3 focus-within:ring-2"
    >
      <button>
        <SearchIcon className="w-5 h-5 text-slate-400" />
      </button>
      <input
        type="text"
        defaultValue=""
        className="border-none bg-transparent flex-1 focus:ring-0 text-slate-200"
        placeholder="検索"
        autoComplete="off"
        {...register('query')}
      />
    </form>
  );
};

export default SearchBox;
