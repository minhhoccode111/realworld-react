import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { AppLayout } from '@/components/layouts/app-layout';
import { ArticlesLayout } from '@/components/layouts/articles-layout';
import { HomeLayout } from '@/components/layouts/home-layout';
import { LIMIT_DEFAULT } from '@/config/constants';
import { getArticlesQueryOptions } from '@/features/articles/api/get-articles';
import { getInfiniteTagsQueryOptions } from '@/features/tags/api/get-tags';
import { TagsList } from '@/features/tags/components/tags-list';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);

    const tagsQuery = getInfiniteTagsQueryOptions({});
    const articlesQuery = getArticlesQueryOptions({
      limit: LIMIT_DEFAULT,
      offset: (page - 1) * LIMIT_DEFAULT,
    });

    const promises = [
      queryClient.getQueryData(articlesQuery.queryKey) ??
        (await queryClient.fetchQuery(articlesQuery)),
      queryClient.getQueryData(tagsQuery.queryKey) ??
        (await queryClient.fetchInfiniteQuery(tagsQuery)),
    ] as const;

    const [articles, tags] = await Promise.all(promises);

    return { articles, tags };
  };

const HomeRoute = () => {
  return (
    <AppLayout title="Home">
      <HomeLayout>
        <div className="row">
          <ArticlesLayout />
          <TagsList />
        </div>
      </HomeLayout>
    </AppLayout>
  );
};

export default HomeRoute;
