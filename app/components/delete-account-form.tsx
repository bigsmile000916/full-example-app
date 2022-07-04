import { useForm } from 'react-hook-form';

const DeleteAccountForm = () => {
  const {
    register,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  return (
    <div>
      <h2>Delete Account</h2>
      <p className="text-slate-200">input your hanldeName(@username)</p>
      <input
        type="text"
        className="rounded"
        {...register('handleName', {
          required: true,
          pattern: new RegExp(`handleName`),
        })}
      />
      <button
        disabled={!isValid}
        className="px-4 py-2 rounded-md bg-red-600 text-white disabled:opacity-30"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccountForm;
