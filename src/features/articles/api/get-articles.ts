import { queryOptions, useQuery } from '@tanstack/react-query';

import { LIMIT_DEFAULT, OFFSET_DEFAULT } from '@/config/constants';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ArticlePreviewsResponse } from '@/types/api';

const getArticles = ({
  isFeed = false,
  tag = '',
  limit = LIMIT_DEFAULT,
  offset = OFFSET_DEFAULT,
}: {
  isFeed?: boolean;
  tag?: string;
  limit?: number;
  offset?: number;
}): Promise<ArticlePreviewsResponse> => {
  if (isFeed) return api.get(`/articles/feed`, { params: { limit, offset } });
  return api.get(`/articles`, { params: { tag, limit, offset } });
};

export const getArticlesQueryOptions = (params?: {
  isFeed?: boolean;
  tag?: string;
  limit?: number;
  offset?: number;
}) => {
  const { isFeed, tag, limit, offset } = params ?? {};

  return queryOptions({
    queryKey: ['articles', { isFeed, tag, limit, offset }],
    queryFn: () => getArticles({ isFeed, tag, limit, offset }),
  });
};

type UseArticlesOptions = {
  isFeed?: boolean;
  tag?: string;
  limit?: number;
  offset?: number;
  queryConfig?: QueryConfig<typeof getArticlesQueryOptions>;
};

export const useArticles = ({
  queryConfig,
  isFeed,
  tag,
  limit,
  offset,
}: UseArticlesOptions) => {
  return useQuery({
    ...getArticlesQueryOptions({ isFeed, tag, limit, offset }),
    ...queryConfig,
  });
};
