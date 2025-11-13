import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { CommentDetailsResponse } from '@/types/api';

const LIMIT = 10;
const OFFSET = 0;

const getComments = ({
  slug,
  limit = LIMIT,
  offset = OFFSET,
}: {
  slug: string;
  limit: number;
  offset: number;
}): Promise<CommentDetailsResponse> => {
  return api.get(`/articles/${slug}/comments`, {
    params: {
      limit,
      offset,
    },
  });
};

export const getInfiniteCommentsQueryOptions = ({
  slug,
  limit = 10,
}: {
  slug: string;
  limit?: number;
}) => {
  return infiniteQueryOptions({
    queryKey: ['comments', slug],
    queryFn: ({ pageParam = 1 }) => {
      const offset = (pageParam - 1) * limit;
      return getComments({ slug, limit, offset });
    },
    getNextPageParam: (lastPage) => {
      const { limit, offset, total } = lastPage;
      if (offset + limit >= total) return undefined;
      return offset / limit + 2;
    },
    initialPageParam: 1,
  });
};

type UseCommentsOptions = {
  slug: string;
  limit?: number;
  queryConfig?: QueryConfig<typeof getComments>;
};

export const useInfiniteComments = ({
  slug,
  limit = 10,
}: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions({ slug, limit }),
  });
};
