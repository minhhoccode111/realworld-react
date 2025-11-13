import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createFavorite = ({ slug }: { slug: string }) => {
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
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getArticleQueryOptions({ slug }).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createFavorite,
  });
};
