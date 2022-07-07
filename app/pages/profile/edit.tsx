import { EditableUserField } from '@shared/types/user';
import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../../components/button';
import ImageEditor from '../../components/image-editor';
import Input from '../../components/input';
import Layout from '../../components/layout';
import PageTitle from '../../components/page-title';
import TextArea from '../../components/textarea';
import { useRequireAuth } from '../../lib/auth';
import { updateUser } from '../../lib/user';
import { formErrorMessages } from '../../lib/validate';
import { NextPageWithLayout } from '../_app';

const Edit: NextPageWithLayout = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditableUserField>();
  const { user } = useRequireAuth();

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const submit = (data: EditableUserField) => {
    return updateUser(user.id, data).then(() => {
      toast.success('Saved');
    });
  };

  return (
    <div className="container">
      <PageTitle>Profile Edit</PageTitle>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <div className="max-w-xs">
          <h2>Cover</h2>
          <ImageEditor name="coverUrl" control={control} type="cover" />
        </div>
        <div>
          <h2>Avatar</h2>
          <div className="w-40">
            <ImageEditor name="photoUrl" control={control} type="avatar" />
          </div>
        </div>
        <Input
          label="Name"
          autoComplete="name"
          {...register('name', {
            required: true,
            maxLength: formErrorMessages.maxLength(255),
          })}
        />
        <TextArea
          label="Description"
          {...register('description', {
            maxLength: formErrorMessages.maxLength(400),
          })}
        />

        <Button disabled={isSubmitting}>Save</Button>
      </form>
    </div>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
