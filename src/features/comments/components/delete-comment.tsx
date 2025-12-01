import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog/confirmation-dialog/confirmation-dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteComment } from '../api/delete-comment';

type DeleteCommentProps = {
  slug: string;
  commentId: string;
};

export const DeleteComment = ({ slug, commentId }: DeleteCommentProps) => {
  const { addNotification } = useNotifications();
  const deleteCommentMutation = useDeleteComment({
    slug,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Comment Deleted',
        });
      },
    },
  });

  return (
    <ConfirmationDialog
      isDone={deleteCommentMutation.isSuccess}
      icon="danger"
      title="Delete Comment"
      body="Are you sure you want to delete this comment?"
      triggerButton={
        <button
          className="text-gray-400 transition-colors hover:text-red-500"
          aria-label="Delete comment"
        >
          <Trash2 className="size-4" />
        </button>
      }
      confirmButton={
        <Button
          isLoading={deleteCommentMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteCommentMutation.mutate({ slug, commentId })}
        >
          Delete Comment
        </Button>
      }
    />
  );
};
