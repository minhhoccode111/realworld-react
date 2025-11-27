import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { LIMIT_DEFAULT, queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { TagsResponse } from '@/types/api';

type TagsQueryParams = {
  limit?: number;
};

type TagsParams = TagsQueryParams & {
  offset?: number;
};

const getTags = ({ limit, offset }: TagsParams): Promise<TagsResponse> => {
  return api.get(`/tags`, { params: { limit, offset } });
};

export const getInfiniteTagsQueryOptions = ({
  limit = LIMIT_DEFAULT,
}: TagsQueryParams) => {
  return infiniteQueryOptions({
    queryKey: [queryKeys.tags],
    queryFn: ({ pageParam = 1 }) => {
      const offset = (pageParam - 1) * limit;
      return getTags({ limit, offset });
    },
    getNextPageParam: (lastPage) => {
      const { limit, offset, total } = lastPage;
      if (offset + limit >= total) return undefined;
      return offset / limit + 2;
    },
    initialPageParam: 1,
  });
};

type UseTagsOptions = TagsQueryParams & {
  queryConfig?: QueryConfig<typeof getTags>;
};

export const useInfiniteTags = ({
  limit,
  queryConfig,
}: UseTagsOptions = {}) => {
  return useInfiniteQuery({
    ...getInfiniteTagsQueryOptions({ limit }),
    ...queryConfig,
  });
};
