import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse, ArticlePreviewsResponse } from '@/types/api';

const favoriteArticle = (slug: string): Promise<ArticleDetailResponse> => {
  return api.post(`/articles/${slug}/favorite`);
};

type UseFavoriteArticleOptions = {
  mutationConfig?: MutationConfig<typeof favoriteArticle>;
};

export const useFavoriteArticleOptions = ({
  mutationConfig,
}: UseFavoriteArticleOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getArticleQueryOptions({ slug: data.article.slug }).queryKey,
        data,
      );

      queryClient.setQueriesData(
        { queryKey: ['articles'], predicate: () => true },
        (oldData: ArticlePreviewsResponse | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            articles: oldData.articles.map((a) =>
              a.slug === data.article.slug ? data.article : a,
            ),
          };
        },
      );
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: favoriteArticle,
  });
};
