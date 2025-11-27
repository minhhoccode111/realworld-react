import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

import { getArticleQueryOptions } from './get-article';

export const updateArticleInputSchema = z.object({
  slug: z.string().min(2, 'slug length min is 2'),
  title: z.string().min(2, 'title length min is 2').max(255),
  description: z.string().min(1, 'description is required').max(255),
  body: z.string().min(1, 'body is required').max(50000),
  // TODO: allow update article tagList
  // tagList: z
  //   .array(
  //     z
  //       .string()
  //       .min(1, 'tag cannot be empty')
  //       .max(50, 'tag length max is 50')
  //       .regex(/^[a-zA-Z0-9_ -]+$/, 'invalid tag'),
  //   )
  //   .max(10, 'too many tags')
  //   .refine((arr) => new Set(arr).size === arr.length, {
  //     message: 'tagList contains duplicate tags',
  //   }),
});

type UpdateArticleInput = z.infer<typeof updateArticleInputSchema>;

const updateArticle = ({
  data,
}: {
  data: UpdateArticleInput;
}): Promise<ArticleDetailResponse> => {
  return api.put(`/articles/${data.slug}`, {
    article: {
      title: data.title,
      description: data.description,
      body: data.body,
      // tagList: data.tagList,
    },
  });
};

type UseUpdateArticleOptions = {
  mutationConfig?: MutationConfig<typeof updateArticle>;
};

export const useUpdateArticle = ({
  mutationConfig,
}: UseUpdateArticleOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      // update article with new slug in cache get-article
      queryClient.setQueryData(
        getArticleQueryOptions({ slug: data.article.slug }).queryKey,
        data,
      );

      // invalidate articles in cache get-articles
      queryClient.invalidateQueries({ queryKey: [queryKeys.articles] });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateArticle,
  });
};
