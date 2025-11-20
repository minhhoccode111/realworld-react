import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse, ArticlePreviewsResponse } from '@/types/api';

const unfavoriteArticle = ({
  slug,
}: {
  slug: string;
}): Promise<ArticleDetailResponse> => {
  return api.delete(`/articles/${slug}/favorite`);
};

type UseUnfavoriteArticleOptions = {
  mutationConfig?: MutationConfig<typeof unfavoriteArticle>;
};

export const useUnfavoriteArticleOptions = ({
  mutationConfig,
}: UseUnfavoriteArticleOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getArticleQueryOptions({ slug: data.article.slug }).queryKey,
        data,
      );

      queryClient.invalidateQueries({
        predicate: (query) => {
          if (!Array.isArray(query.queryKey)) return false;
          if (query.queryKey[0] !== 'articles') return false;

          const params = query.queryKey[1];
          if (typeof params !== 'object' || params === null) return false;

          const value = params.favorited;
          return typeof value === 'string' && value.trim() !== '';
        },
      });

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
    mutationFn: unfavoriteArticle,
  });
};
