import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteFavorite = ({ slug }: { slug: string }) => {
  return api.delete(`/articles/${slug}/favorite`);
};

type UseDeleteFavoriteOptions = {
  slug: string;
  mutationConfig?: MutationConfig<typeof deleteFavorite>;
};

export const useDeleteFavoriteOptions = ({
  slug,
  mutationConfig,
}: UseDeleteFavoriteOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getArticleQueryOptions({ slug }).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteFavorite,
  });
};
