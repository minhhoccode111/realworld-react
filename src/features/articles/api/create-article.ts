import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

import { getArticleQueryOptions } from './get-article';

export const createArticleInputSchema = z.object({
  title: z
    .string()
    .min(2, 'Title length min is 2')
    .max(255, 'Title must be at most 255 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(255, 'Description must be at most 255 characters'),
  body: z
    .string()
    .min(1, 'Body is required')
    .max(50000, 'Body must be at most 50000 characters'),
  tagList: z
    .array(
      z
        .string()
        .min(1, 'Tag cannot be empty')
        .max(50, 'Tag length max is 50')
        .regex(/^[a-zA-Z0-9_ -]+$/, 'Invalid tag'),
    )
    .max(10, 'Too many tags')
    .refine((arr) => new Set(arr).size === arr.length, {
      message: 'TagList contains duplicate tags',
    }),
});

type CreateArticleInput = z.infer<typeof createArticleInputSchema>;

const createArticle = ({
  data,
}: {
  data: CreateArticleInput;
}): Promise<ArticleDetailResponse> => {
  return api.post('/articles', {
    article: {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList,
    },
  });
};

type UseCreateArticleOptions = {
  mutationConfig?: MutationConfig<typeof createArticle>;
};

export const useCreateArticle = ({
  mutationConfig,
}: UseCreateArticleOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      // update article with that slug in cache get-article
      queryClient.setQueryData(
        getArticleQueryOptions({ slug: data.article.slug }).queryKey,
        data,
      );

      // invalidate articles in cache get-articles
      queryClient.invalidateQueries({ queryKey: [queryKeys.articles] });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createArticle,
  });
};
