import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteFavorite = ({
  slug,
}: {
  slug: string;
}): Promise<ArticleDetailResponse> => {
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
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getArticleQueryOptions({ slug }).queryKey, data);
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: deleteFavorite,
  });
};
