import { AppLayout } from '@/components/layouts/app-layout';
import { ArticlesLayout } from '@/components/layouts/articles-layout';
import { HomeLayout } from '@/components/layouts/home-layout';
import { getInfiniteTagsQueryOptions } from '@/features/tags/api/get-tags';
import { TagsList } from '@/features/tags/components/tags-list';
import { QueryClient } from '@tanstack/react-query';

export const clientLoader = (queryClient: QueryClient) => async () => {
  const tagsQuery = getInfiniteTagsQueryOptions({});

  return (
    queryClient.getQueryData(tagsQuery.queryKey) ??
    (await queryClient.fetchInfiniteQuery(tagsQuery))
  );
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
