import { queryOptions, useQuery } from '@tanstack/react-query';

import { LIMIT_DEFAULT, OFFSET_DEFAULT } from '@/config/constants';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ArticlePreviewsResponse } from '@/types/api';

type getArticlesProps = {
  isFeed?: boolean;
  author?: string;
  favorited?: string;
  tag?: string;
  limit?: number;
  offset?: number;
};

const getArticles = ({
  isFeed = false,
  author = '',
  favorited = '',
  tag = '',
  limit = LIMIT_DEFAULT,
  offset = OFFSET_DEFAULT,
}: getArticlesProps): Promise<ArticlePreviewsResponse> => {
  if (isFeed) return api.get(`/articles/feed`, { params: { limit, offset } });
  return api.get(`/articles`, {
    params: { author, favorited, tag, limit, offset },
  });
};

export const getArticlesQueryOptions = (params?: {
  isFeed?: boolean;
  author?: string;
  favorited?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}) => {
  const { isFeed, author, favorited, tag, limit, offset } = params ?? {};

  return queryOptions({
    queryKey: ['articles', { isFeed, author, favorited, tag, limit, offset }],
    queryFn: () =>
      getArticles({ isFeed, author, favorited, tag, limit, offset }),
  });
};

type UseArticlesOptions = {
  isFeed?: boolean;
  author?: string;
  favorited?: string;
  tag?: string;
  limit?: number;
  offset?: number;
  queryConfig?: QueryConfig<typeof getArticlesQueryOptions>;
};

export const useArticles = ({
  queryConfig,
  isFeed,
  author,
  favorited,
  tag,
  limit,
  offset,
}: UseArticlesOptions) => {
  return useQuery({
    ...getArticlesQueryOptions({
      isFeed,
      author,
      favorited,
      tag,
      limit,
      offset,
    }),
    ...queryConfig,
  });
};
