import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { LIMIT_DEFAULT, queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { CommentDetailsResponse } from '@/types/api';

type CommentsQueryParams = {
  slug: string;
  limit?: number;
};

type CommentsParams = CommentsQueryParams & {
  offset?: number;
};

const getComments = ({
  slug,
  limit,
  offset,
}: CommentsParams): Promise<CommentDetailsResponse> => {
  return api.get(`/articles/${slug}/comments`, { params: { limit, offset } });
};

export const getInfiniteCommentsQueryOptions = ({
  slug,
  limit = LIMIT_DEFAULT,
}: CommentsQueryParams) => {
  return infiniteQueryOptions({
    queryKey: [queryKeys.comments, slug],
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

type UseCommentsOptions = CommentsQueryParams & {
  queryConfig?: QueryConfig<typeof getComments>;
};

export const useInfiniteComments = ({
  slug,
  limit,
  queryConfig,
}: UseCommentsOptions) => {
  return useInfiniteQuery({
    ...getInfiniteCommentsQueryOptions({ slug, limit }),
    ...queryConfig,
  });
};
