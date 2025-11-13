import React from 'react';

import { Form } from '@/components/ui/form/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';

import {
  createCommentInputSchema,
  useCreateComment,
} from '../api/create-comment';

type CommentFormProps = {
  slug: string;
};

export const CreateComment = ({ slug }: CommentFormProps) => {
  const { addNotification } = useNotifications();
  const user = useUser();

  // ref to reset form state on success
  const resetRef = React.useRef<(() => void) | null>(null);

  const createCommentMutation = useCreateComment({
    slug,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Comment Created',
        });
        resetRef.current?.();
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => createCommentMutation.mutate({ data: values })}
      schema={createCommentInputSchema}
      options={{
        defaultValues: {
          slug,
          body: '',
        },
      }}
      className="card comment-form"
    >
      {({ register, formState, reset }) => {
        resetRef.current = reset;
        return (
          <>
            <div className="card-block">
              <textarea
                className="form-control"
                placeholder="Write a comment..."
                rows={3}
                {...register('body')}
              ></textarea>
            </div>

            <FormErrors className="error-messages" errors={formState.errors} />

            <div className="card-footer">
              <img src={user.data?.user.image} className="comment-author-img" />
              <button
                disabled={createCommentMutation.isPending}
                type="submit"
                className="btn btn-sm btn-primary"
              >
                {createCommentMutation.isPending
                  ? 'Loading...'
                  : 'Post Comment'}
              </button>
            </div>
          </>
        );
      }}
    </Form>
  );
};
