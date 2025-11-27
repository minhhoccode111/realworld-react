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

export const useDeleteArticle = ({
  slug,
  mutationConfig,
}: UseDeleteArticleOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      // cancel any query of article with that slug in cache get-article
      queryClient.cancelQueries({
        queryKey: getArticleQueryOptions({ slug }).queryKey,
      });

      // invalidate articles in cache get-articles
      queryClient.invalidateQueries({ queryKey: [queryKeys.articles] });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteArticle,
  });
};
