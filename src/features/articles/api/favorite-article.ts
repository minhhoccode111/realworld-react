import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/config/constants';
import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { useUser } from '@/lib/auth';
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

export const useFavoriteArticle = ({
  mutationConfig,
}: UseFavoriteArticleOptions = {}) => {
  const user = useUser();
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      // update article with that slug in cache get-article
      queryClient.setQueryData(
        getArticleQueryOptions({ slug: data.article.slug }).queryKey,
        data,
      );

      // update articles with that slug in cache get-articles
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

      // invalidate articles in cache get-articles-favorited of current user profile
      queryClient.invalidateQueries({
        queryKey: [queryKeys.articles],
        predicate: (query) => {
          if (!Array.isArray(query.queryKey)) return false;
          if (query.queryKey[0] !== queryKeys.articles) return false;

          const params = query.queryKey[1];
          if (typeof params !== 'object' || params === null) return false;

          return params.favorited === user.data?.user.username;
        },
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: favoriteArticle,
  });
};
