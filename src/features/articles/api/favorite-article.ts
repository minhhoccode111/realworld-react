import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/config/constants';
import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse, ArticlePreviewsResponse } from '@/types/api';

const favoriteArticle = ({
  slug,
}: {
  slug: string;
}): Promise<ArticleDetailResponse> => {
  return api.post(`/articles/${slug}/favorite`);
};

type UseFavoriteArticleOptions = {
  mutationConfig?: MutationConfig<typeof favoriteArticle>;
};

export const useFavoriteArticleOptions = ({
  mutationConfig,
}: UseFavoriteArticleOptions) => {
  const queryClient = useQueryClient();
  // TODO: try to find a way to only invalidate current user's profile favorited articles
  // const user = useUser()

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      // update current article in the `article` query cache with the same `slug`
      queryClient.setQueryData(
        getArticleQueryOptions({ slug: data.article.slug }).queryKey,
        data,
      );

      // update every article in the `articles` query cache with the same `slug`
      queryClient.setQueriesData(
        {
          queryKey: [queryKeys.articles],
          predicate: (query) => {
            const key = query.queryKey;
            return key[0] === queryKeys.articles && key.length >= 1;
          },
        },
        (oldData: ArticlePreviewsResponse | undefined) => {
          if (!oldData || !Array.isArray(oldData.articles)) return;

          return {
            ...oldData,
            articles: oldData.articles.map((a) =>
              a.slug === data.article.slug ? data.article : a,
            ),
          };
        },
      );

      // invalidate all favorited-articles queries for profiles
      queryClient.invalidateQueries({
        queryKey: [queryKeys.articles],
        predicate: (query) => {
          if (!Array.isArray(query.queryKey)) return false;
          if (query.queryKey[0] !== queryKeys.articles) return false;

          const params = query.queryKey[1];
          if (typeof params !== 'object' || params === null) return false;

          const value = params.favorited;
          return typeof value === 'string' && value.trim() !== '';
        },
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: favoriteArticle,
  });
};
