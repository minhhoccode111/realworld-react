import { queryOptions, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

type ArticleQueryParams = {
  slug: string;
};

const getArticle = ({
  slug,
}: ArticleQueryParams): Promise<ArticleDetailResponse> => {
  return api.get(`/articles/${slug}`);
};

export const getArticleQueryOptions = ({ slug }: ArticleQueryParams) => {
  return queryOptions({
    queryKey: [queryKeys.article, slug],
    queryFn: () => getArticle({ slug }),
  });
};

type UseArticleOptions = ArticleQueryParams & {
  queryConfig?: QueryConfig<typeof getArticleQueryOptions>;
};

export const useArticle = ({ slug, queryConfig }: UseArticleOptions) => {
  return useQuery({
    ...getArticleQueryOptions({ slug }),
    ...queryConfig,
  });
};
