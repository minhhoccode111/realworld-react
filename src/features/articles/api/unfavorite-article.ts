import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

const unfavoriteArticle = ({
  slug,
}: {
  slug: string;
}): Promise<ArticleDetailResponse> => {
  return api.delete(`/articles/${slug}/favorite`);
};

type UseUnfavoriteArticleOptions = {
  slug: string;
  mutationConfig?: MutationConfig<typeof unfavoriteArticle>;
};

export const useUnfavoriteArticleOptions = ({
  slug,
  mutationConfig,
}: UseUnfavoriteArticleOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getArticleQueryOptions({ slug }).queryKey, data);
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: unfavoriteArticle,
  });
};
