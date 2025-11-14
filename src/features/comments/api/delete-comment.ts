import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getInfiniteCommentsQueryOptions } from './get-comments';

const deleteComment = ({
  slug,
  commentId,
}: {
  slug: string;
  commentId: string;
}) => {
  return api.delete(`/articles/${slug}/comments/${commentId}`);
};

type UseDeleteCommentOptions = {
  slug: string;
  mutationConfig?: MutationConfig<typeof deleteComment>;
};

export const useDeleteCommentOptions = ({
  slug,
  mutationConfig,
}: UseDeleteCommentOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions({ slug }).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteComment,
  });
};
