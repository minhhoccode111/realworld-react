import { useQuery, queryOptions } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

export const getArticle = ({
  slug,
}: {
  slug: string;
}): Promise<ArticleDetailResponse> => {
  return api.get(`/articles/${slug}`);
};

export const getArticleQueryOptions = (slug: string) => {
  return queryOptions({
    queryKey: ['articles', slug],
    queryFn: () => getArticle({ slug }),
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
