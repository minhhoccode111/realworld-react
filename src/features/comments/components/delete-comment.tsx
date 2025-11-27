import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog/confirmation-dialog/confirmation-dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteComment } from '../api/delete-comment';

type DeleteCommentPropts = {
  slug: string;
  commentId: string;
};

export const DeleteComment = ({ slug, commentId }: DeleteCommentPropts) => {
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
        <span className="mod-options">
          <i className="ion-trash-a"></i>
        </span>
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
