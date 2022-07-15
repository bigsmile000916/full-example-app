import { Post } from '@shared/types/post';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from '../components/button';
import ImageEditor from '../components/image-editor';
import Input from '../components/input';
import Select from '../components/select';
import TextArea from '../components/textarea';
import { useRequireAuth } from '../lib/auth';
import useFormGuard from '../lib/form-guard';
import {
  CategoryOptions,
  createPost,
  deletePost,
  updatePost,
} from '../lib/post';
import { formErrorMessages } from '../lib/validate';

const PostForm: FC<{
  post?: Post;
}> = ({ post }) => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<Post>();

  const isEditMode = Boolean(post);
  const { user } = useRequireAuth();
  const router = useRouter();

  useEffect(() => {
    if (post) {
      reset(post);
    }
  }, [post, reset]);

  useFormGuard(isDirty);

  const maxLength = 400;

  if (!user) {
    return null;
  }

  const submit = (data: Post) => {
    if (isEditMode) {
      return updatePost(post!.id, data).then(() => {
        toast.success('更新しました');
        reset(undefined, {
          keepValues: true,
        });
      });
    } else {
      return createPost({
        ...data,
        authorId: user.id,
      }).then(() => {
        reset(undefined);
        toast.success('投稿しました');
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('本当に削除しますか？')) {
      deletePost(post!.id).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
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

      <div className="lg:col-span-1 space-y-4">
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
        <div className="text-right">
          {post && (
            <button
              onClick={handleDelete}
              type="button"
              className="text-red-500 px-2 py-1 mr-4 text-sm"
            >
              削除
            </button>
          )}
          <Button disabled={isSubmitting}>{post ? '保存' : '公開'}</Button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
