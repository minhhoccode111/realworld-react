import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getArticleQueryOptions } from './get-article';

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
      // cancel current article in the `article` query cache with the same `slug`
      queryClient.cancelQueries({
        queryKey: getArticleQueryOptions({ slug }).queryKey,
      });

      // invalidate all 'articles' query
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (!Array.isArray(query.queryKey)) return false;
          return query.queryKey[0] === queryKeys.articles;
        },
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteArticle,
  });
};
