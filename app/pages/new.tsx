import { Post } from '@shared/types/post';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../components/button';
import ImageEditor from '../components/image-editor';
import Input from '../components/input';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import Select from '../components/select';
import TextArea from '../components/textarea';
import { useRequireAuth } from '../lib/auth';
import useFormGuard from '../lib/form-guard';
import { CategoryOptions, createPost } from '../lib/post';
import { formErrorMessages } from '../lib/validate';
import { NextPageWithLayout } from './_app';

const New: NextPageWithLayout = () => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<Post>();

  const { user } = useRequireAuth();

  useFormGuard(isDirty);

  const maxLength = 400;

  if (!user) {
    return null;
  }

  const submit = (data: Post) => {
    return createPost({
      ...data,
      authorId: user.id,
    })
      .then(() => {
        reset(undefined);
        toast.success('投稿しました');
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <PageTitle>投稿</PageTitle>

      <form onSubmit={handleSubmit(submit)} className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div>
            <Input
              name="title"
              control={control}
              label="タイトル"
              type="text"
              autoComplete="off"
              defaultValue=""
              rules={{
                required: formErrorMessages.required,
              }}
            />
          </div>

          <div>
            <TextArea
              label="本文"
              rows={16}
              name="body"
              control={control}
              defaultValue=""
              rules={{
                required: formErrorMessages.required,
                maxLength: formErrorMessages.maxLength(maxLength),
              }}
            />
          </div>
        </div>

        <div className="col-span-1 space-y-4">
          <ImageEditor
            name="coverUrl"
            type="cover"
            control={control}
            defaultValue=""
          />
          <Select
            name="category"
            options={CategoryOptions}
            control={control}
            defaultValue=""
          />
          <div>
            <Button disabled={isSubmitting}>送信</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default New;

New.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
