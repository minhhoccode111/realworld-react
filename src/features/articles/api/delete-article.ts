import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getArticleQueryOptions } from './get-article';
import { ArticlePreviewsResponse } from '@/types/api';

const deleteArticle = ({ slug }: { slug: string }) => {
  return api.delete(`/articles/${slug}`);
};

type UseDeleteArticleOptions = {
  slug: string;
  mutationConfig?: MutationConfig<typeof deleteArticle>;
};

export const useDeleteArticleOptions = ({
  slug,
  mutationConfig,
}: UseDeleteArticleOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.removeQueries({
        queryKey: getArticleQueryOptions({ slug }).queryKey,
      });

      queryClient.cancelQueries({
        queryKey: getArticleQueryOptions({ slug }).queryKey,
      });

      queryClient.setQueriesData(
        { queryKey: ['articles'], predicate: () => true },
        (oldData: ArticlePreviewsResponse | undefined) => {
          if (!oldData) return;

          return {
            ...oldData,
            articles: oldData.articles.filter((a) => a.slug !== slug),
          };
        },
      );

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteArticle,
  });
};
