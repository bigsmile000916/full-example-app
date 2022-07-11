import { EditableUserField, User } from '@shared/types/user';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { createUser, updateUser } from '../lib/user';
import { formErrorMessages } from '../lib/validate';
import Button from './button';
import ImageEditor from './image-editor';
import Input from './input';
import TextArea from './textarea';

const UserForm: FC<{
  mode: 'create' | 'edit';
  user?: User;
}> = ({ mode, user }) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditableUserField>();

  const { fbUser } = useAuth();

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  if (!fbUser) {
    return null;
  }

  const submit = (data: EditableUserField) => {
    if (mode === 'edit' && user) {
      return updateUser(user.id, data).then(() => {
        toast.success('更新しました');
      });
    }

    if (mode === 'create') {
      return createUser(fbUser.uid, data).then(() => {
        toast.success('更新しました');
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(submit)}>
      <div className="max-w-xs">
        <h2>カバー画像</h2>
        <ImageEditor
          name="coverUrl"
          defaultValue=""
          control={control}
          type="cover"
        />
      </div>
      <div>
        <h2>プロフィール画像</h2>
        <div className="w-40">
          <ImageEditor
            defaultValue={fbUser.photoURL as string}
            name="photoUrl"
            control={control}
            type="avatar"
          />
        </div>
      </div>
      <Input
        label="ハンドルネーム"
        autoComplete="off"
        control={control}
        defaultValue=""
        name="handleName"
        rules={{
          required: formErrorMessages.required,
          maxLength: formErrorMessages.maxLength(20),
        }}
      />
      <Input
        label="名前"
        autoComplete="name"
        control={control}
        defaultValue=""
        name="name"
        rules={{
          required: formErrorMessages.required,
          maxLength: formErrorMessages.maxLength(255),
        }}
      />
      <TextArea
        label="プロフィール"
        name="description"
        defaultValue=""
        control={control}
        rules={{
          maxLength: formErrorMessages.maxLength(400),
        }}
      />

      <Button disabled={isSubmitting}>
        {mode === 'create' ? 'アカウント作成' : '更新'}
      </Button>
    </form>
  );
};

export default UserForm;
