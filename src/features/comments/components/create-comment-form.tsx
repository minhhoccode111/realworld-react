import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card/card';
import { Form } from '@/components/ui/form/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { Textarea } from '@/components/ui/form/textarea';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { getUserInitials } from '@/utils/user-initials';

import {
  createCommentInputSchema,
  useCreateComment,
} from '../api/create-comment';

type CommentFormProps = {
  slug: string;
};

export const CreateCommentForm = ({ slug }: CommentFormProps) => {
  const { addNotification } = useNotifications();
  const user = useUser();

  const location = useLocation();
  const navigate = useNavigate();

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
      onSubmit={(values) => {
        if (!user.data) {
          navigate(paths.login.getHref(location.pathname));
          return;
        }
        createCommentMutation.mutate({ data: values });
      }}
      schema={createCommentInputSchema}
      options={{
        defaultValues: {
          slug,
          body: '',
        },
      }}
    >
      {({ register, formState, reset }) => {
        resetRef.current = reset;
        return (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <Textarea
                placeholder="Write a comment..."
                rows={3}
                className="resize-none"
                registration={register('body')}
              />
              <FormErrors className="mx-4 mt-2" errors={formState.errors} />
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t bg-gray-50 px-6 py-3">
              <Avatar className="size-8">
                <AvatarImage
                  src={user.data?.user.image ?? ''}
                  alt={user.data?.user.username ?? ''}
                />
                <AvatarFallback>
                  {getUserInitials(user.data?.user.username ?? 'U')}
                </AvatarFallback>
              </Avatar>

              <Button
                type="submit"
                size="sm"
                disabled={createCommentMutation.isPending}
                isLoading={createCommentMutation.isPending}
                variant="realworld"
              >
                Post Comment
              </Button>
            </CardFooter>
          </Card>
        );
      }}
    </Form>
  );
};
