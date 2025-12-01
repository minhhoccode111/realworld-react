import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';

import { useDeleteArticle } from '../api/delete-article';

type DeleteArticleProps = {
  slug: string;
};

export const DeleteArticle = ({ slug }: DeleteArticleProps) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const deleteArticleMutation = useDeleteArticle({
    slug,
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Article Deleted',
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
        <Button
          size="sm"
          variant="outline"
          className="rounded-sm border-red-400 bg-transparent text-sm text-red-400 hover:bg-red-400 hover:text-realworld-foreground"
          icon={<Trash className="size-4" />}
        >
          Delete Article
        </Button>
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
