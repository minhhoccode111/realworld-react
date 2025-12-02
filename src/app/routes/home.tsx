import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router';

import { AppLayout } from '@/components/layouts/app-layout';
import { HomeLayout } from '@/components/layouts/home-layout';
import { LIMIT_DEFAULT } from '@/config/constants';
import { getArticlesQueryOptions } from '@/features/articles/api/get-articles';
import { ArticlesLayout } from '@/features/articles/components/articles-layout';
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <ArticlesLayout />
          </div>

          <aside className="lg:col-span-3">
            <div className="sticky top-4 flex max-h-[calc(100vh-2rem)] flex-col bg-[#F3F3F3] p-2 shadow-inner">
              <h2 className="mb-2 text-sm font-semibold text-gray-700">
                Popular Tags
              </h2>

              <TagsList />
            </div>
          </aside>
        </div>
      </HomeLayout>
    </AppLayout>
  );
};

export default HomeRoute;
