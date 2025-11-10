import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

const getArticle = (slug: string): Promise<ArticleDetailResponse> => {
  return api.get(`/articles/${slug}`);
};

const getArticleQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ['articles', slug],
    queryFn: () => getArticle(slug),
  });
};

type UseArticleOptions = {
  slug: string;
  queryConfig?: QueryConfig<typeof getArticleQueryOptions>;
};

export const useArticle = ({ slug, queryConfig }: UseArticleOptions) => {
  return useQuery({
    ...getArticleQueryOptions(slug),
    ...queryConfig,
  });
};
