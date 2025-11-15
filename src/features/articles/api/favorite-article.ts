import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

const favoriteArticle = ({
  slug,
}: {
  slug: string;
}): Promise<ArticleDetailResponse> => {
  return api.post(`/articles/${slug}/favorite`);
};

type UseFavoriteArticleOptions = {
  slug: string;
  mutationConfig?: MutationConfig<typeof favoriteArticle>;
};

export const useFavoriteArticleOptions = ({
  slug,
  mutationConfig,
}: UseFavoriteArticleOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getArticleQueryOptions({ slug }).queryKey, data);
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: favoriteArticle,
  });
};
