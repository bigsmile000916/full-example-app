import { Post } from '@shared/types/post';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import ImageEditor from '../components/image-editor';
import Input from '../components/input';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
import TextArea from '../components/textarea';
import { formErrorMessages } from '../lib/validate';
import { NextPageWithLayout } from './_app';

const New: NextPageWithLayout = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<Post>();

  const maxLength = 400;

  const submit = () => {};

  return (
    <div className="container">
      <PageTitle>New</PageTitle>

      <form onSubmit={handleSubmit(submit)} className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div>
            <Input
              {...register('title', {
                required: formErrorMessages.required,
              })}
              errors={errors}
              label="Title"
              type="text"
              autoFocus
              autoComplete="off"
              className="w-full"
            />
          </div>

          <div>
            <TextArea
              label="Body"
              rows={16}
              limitLength={maxLength}
              errors={errors}
              currentLength={watch('body')?.length}
              {...register('body', {
                required: formErrorMessages.required,
                maxLength: formErrorMessages.maxLength(maxLength),
              })}
            />
          </div>
        </div>

        <div className="col-span-1">
          <ImageEditor
            name="coverUrl"
            type="cover"
            control={control}
            rules={{
              required: true,
            }}
          />
          <div className="mt-4">
            <button className="px-4 py-1.5 rounded-full bg-blue-500 text-white">
              Post
            </button>
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
