import { useMutation, useQueryClient } from '@tanstack/react-query';

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
      queryClient.removeQueries({
        queryKey: getArticleQueryOptions({ slug }).queryKey,
      });

      // TODO: mark get list articles as staled
      // queryClient.invalidateQueries({
      //   queryKey: getInfiniteArticlesQueryOptions().queryKey,
      // });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteArticle,
  });
};
