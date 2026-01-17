import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { CommentDetailResponse } from '@/types/api';

import { getInfiniteCommentsQueryOptions } from './get-comments';

export const createCommentInputSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  body: z
    .string()
    .trim()
    .min(1, 'Body is required')
    .max(10000, 'Body must be at most 10000 characters'),
});

type CreateCommentInput = z.infer<typeof createCommentInputSchema>;

const createComment = ({
  data,
}: {
  data: CreateCommentInput;
}): Promise<CommentDetailResponse> => {
  return api.post(`/articles/${data.slug}/comments`, {
    comment: { body: data.body },
  });
};

type UseCreateCommentOptions = {
  slug: string;
  mutationConfig?: MutationConfig<typeof createComment>;
};

export const useCreateComment = ({
  mutationConfig,
  slug,
}: UseCreateCommentOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // invalidate comments of article with that slug in cache get-comments-infinite
      queryClient.invalidateQueries({
        queryKey: getInfiniteCommentsQueryOptions({ slug }).queryKey,
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createComment,
  });
};
