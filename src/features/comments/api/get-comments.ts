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

export const getInfiniteCommentsQueryOptions = (slug: string) => {
  return infiniteQueryOptions({
    queryKey: ['comments', slug],
    queryFn: ({ pageParam = 1 }) => {
      const limit = LIMIT;
      const offset = (pageParam - 1) * limit;
      return getComments({ slug, limit, offset });
    },
    getNextPageParam: (lastPage) => {
      const limit = lastPage.limit;
      const offset = lastPage.offset;
      const total = lastPage.total;
      if (offset + limit === total) return undefined;
      const nextPage = offset / limit + 2;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

type UseCommentsOptions = {
  slug: string;
  limit?: number;
  offset?: number;
  queryConfig?: QueryConfig<typeof getComments>;
};

export const useInfiniteComments = ({ slug }: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions(slug),
  });
};
