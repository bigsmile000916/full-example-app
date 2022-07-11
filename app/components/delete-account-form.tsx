import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { deleteAccount, useRequireAuth } from '../lib/auth';
import Input from './input';

const DeleteAccountForm = () => {
  const router = useRouter();
  const { user } = useRequireAuth();
  const {
    control,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4">アカウント削除</h2>
      <p className="text-slate-200">
        ハンドルネーム({user.handleName})を入力してください
      </p>
      <div className="flex mt-4">
        <Input
          name="handleName"
          control={control}
          rules={{
            required: true,
            pattern: new RegExp('^' + user.handleName + '$'),
          }}
        />
        <button
          onClick={() => {
            deleteAccount();
            router.push('/');
          }}
          disabled={!isValid}
          className="px-4 py-2 rounded-md bg-red-600 text-white disabled:opacity-30 ml-4"
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountForm;
