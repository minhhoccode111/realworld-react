import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

const createFavorite = ({
  slug,
}: {
  slug: string;
}): Promise<ArticleDetailResponse> => {
  return api.post(`/articles/${slug}/favorite`);
};

type UseCreateFavoriteOptions = {
  slug: string;
  mutationConfig?: MutationConfig<typeof createFavorite>;
};

export const useCreateFavoriteOptions = ({
  slug,
  mutationConfig,
}: UseCreateFavoriteOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getArticleQueryOptions({ slug }).queryKey, data);
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createFavorite,
  });
};
