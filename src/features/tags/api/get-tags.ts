import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { TagsResponse } from '@/types/api';

const LIMIT = 10;
const OFFSET = 0;

const getTags = ({
  limit = LIMIT,
  offset = OFFSET,
}: {
  limit: number;
  offset: number;
}): Promise<TagsResponse> => {
  return api.get(`/tags`, {
    params: {
      limit,
      offset,
    },
  });
};

export const getInfiniteTagsQueryOptions = ({
  limit = LIMIT,
}: {
  limit?: number;
}) => {
  return infiniteQueryOptions({
    queryKey: ['tags'],
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

type UseTagsOptions = {
  limit?: number;
  queryConfig?: QueryConfig<typeof getTags>;
};

export const useInfiniteTags = ({ limit = LIMIT }: UseTagsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteTagsQueryOptions({ limit }),
  });
};
