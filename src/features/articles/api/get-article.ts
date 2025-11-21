import { queryOptions, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ArticleDetailResponse } from '@/types/api';

const getArticle = ({
  slug,
}: {
  slug: string;
}): Promise<ArticleDetailResponse> => {
  return api.get(`/articles/${slug}`);
};

export const getArticleQueryOptions = ({ slug }: { slug: string }) => {
  return queryOptions({
    queryKey: [queryKeys.article, slug],
    queryFn: () => getArticle({ slug }),
  });
};

type UseArticleOptions = {
  slug: string;
  queryConfig?: QueryConfig<typeof getArticleQueryOptions>;
};

export const useArticle = ({ slug, queryConfig }: UseArticleOptions) => {
  return useQuery({
    ...getArticleQueryOptions({ slug }),
    ...queryConfig,
  });
};
