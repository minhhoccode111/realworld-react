import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ArticlePreviewsResponse } from '@/types/api';

const LIMIT = 10;
const OFFSET = 0;

const getArticles = ({
  isFeed = false,
  tag = '',
  limit = LIMIT,
  offset = OFFSET,
}: {
  isFeed?: boolean;
  tag?: string;
  limit?: number;
  offset?: number;
}): Promise<ArticlePreviewsResponse> => {
  if (isFeed) return api.get(`/articles/feed`, { params: { limit, offset } });
  return api.get(`/articles`, { params: { tag, limit, offset } });
};

const getArticlesQueryOptions = ({
  isFeed,
  tag,
  limit,
  offset,
}: {
  isFeed?: boolean;
  tag?: string;
  limit?: number;
  offset?: number;
}) => {
  const strQueryKey = isFeed ? 'articles/feed' : 'articles';
  return queryOptions({
    queryKey: [strQueryKey, { tag, limit, offset }],
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
