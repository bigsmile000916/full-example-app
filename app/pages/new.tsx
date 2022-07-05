import { Post } from '@shared/types/post';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import ImageEditor from '../components/image-editor';
import Input from '../components/input';
import Layout from '../components/layout';
import PageTitle from '../components/page-title';
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
            <label>
              <span className="block">Body</span>
              <textarea
                className="border bg-transparent border-slate-500 px-2 py-2 rounded-md w-full"
                required
                rows={16}
                {...register('body', {
                  required: formErrorMessages.required,
                  maxLength: formErrorMessages.maxLength(maxLength),
                })}
              />
            </label>
            <p className="text-sm text-right text-slate-500">
              {watch('body')?.length || 0} / {maxLength}
            </p>
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
