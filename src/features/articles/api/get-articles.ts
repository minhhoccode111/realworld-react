import { queryOptions, useQuery } from '@tanstack/react-query';

import { LIMIT_DEFAULT, OFFSET_DEFAULT, queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ArticlePreviewsResponse } from '@/types/api';

type ArticlesQueryParams = {
  isFeed?: boolean;
  author?: string;
  favorited?: string;
  tag?: string;
  limit?: number;
  offset?: number;
};

const getArticles = (
  params: ArticlesQueryParams = {},
): Promise<ArticlePreviewsResponse> => {
  const {
    isFeed,
    author,
    favorited,
    tag,
    limit = LIMIT_DEFAULT,
    offset = OFFSET_DEFAULT,
  } = params;
  if (isFeed) {
    return api.get('/articles/feed', { params: { limit, offset } });
  }
  return api.get('/articles', {
    params: { author, favorited, tag, limit, offset },
  });
};

export const getArticlesQueryOptions = (params: ArticlesQueryParams = {}) => {
  return queryOptions({
    queryKey: [queryKeys.articles, params],
    queryFn: () => getArticles(params),
  });
};

type UseArticlesOptions = ArticlesQueryParams & {
  queryConfig?: QueryConfig<typeof getArticlesQueryOptions>;
};

export const useArticles = ({
  queryConfig,
  ...params
}: UseArticlesOptions = {}) => {
  return useQuery({
    ...getArticlesQueryOptions(params),
    ...queryConfig,
  });
};
