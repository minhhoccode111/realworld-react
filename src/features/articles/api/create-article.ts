import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

import { getArticleQueryOptions } from './get-article';

export const createArticleInputSchema = z.object({
  title: z.string().min(2, 'title length min is 2').max(255),
  description: z.string().min(1, 'description is required').max(255),
  body: z.string().min(1, 'body is required').max(50000),
  tagList: z
    .array(
      z
        .string()
        .min(1, 'tag cannot be empty')
        .max(50, 'tag length max is 50')
        .regex(/^[a-zA-Z0-9_ -]+$/, 'invalid tag'),
    )
    .max(10, 'too many tags')
    .refine((arr) => new Set(arr).size === arr.length, {
      message: 'tagList contains duplicate tags',
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
      // update current article in the `article` query cache with the same `slug`
      queryClient.setQueryData(
        getArticleQueryOptions({ slug: data.article.slug }).queryKey,
        data,
      );

      // invalidate all 'articles' query
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (!Array.isArray(query.queryKey)) return false;
          return query.queryKey[0] === queryKeys.articles;
        },
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: createArticle,
  });
};
