import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';

import { useDeleteArticleOptions } from '../api/delete-article';

type DeleteArticleProps = {
  slug: string;
};

export const DeleteArticle = ({ slug }: DeleteArticleProps) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const deleteArticleMutation = useDeleteArticleOptions({
    slug,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: `Article Deleted`,
        });
        navigate(paths.home.getHref(), { replace: true });
      },
    },
  });
  return (
    <ConfirmationDialog
      isDone={deleteArticleMutation.isSuccess}
      icon="danger"
      title="Delete Article"
      body="Are you sure you want to delete this article?"
      triggerButton={
        <button className="btn btn-sm btn-outline-danger">
          <i className="ion-trash-a"></i> Delete Article
        </button>
      }
      confirmButton={
        <Button
          isLoading={deleteArticleMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteArticleMutation.mutate({ slug })}
        >
          Delete Article
        </Button>
      }
    />
  );
};
