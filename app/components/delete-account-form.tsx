import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { deleteAccount, useRequireAuth } from '../lib/auth';
import Input from './input';

const DeleteAccountForm = () => {
  const router = useRouter();
  const { user } = useRequireAuth();
  const {
    register,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4">Delete Account</h2>
      <p className="text-slate-200">
        input your hanldeName(@{user.handleName})
      </p>
      <div className="flex mt-4">
        <Input
          {...register('handleName', {
            required: true,
            pattern: new RegExp(user.handleName),
          })}
        />
        <button
          onClick={() => {
            deleteAccount();
            router.push('/');
          }}
          disabled={!isValid}
          className="px-4 py-2 rounded-md bg-red-600 text-white disabled:opacity-30 ml-4"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountForm;
