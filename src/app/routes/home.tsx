import { AppLayout } from '@/components/layouts/app-layout';
import { ArticlesLayout } from '@/components/layouts/articles-layout';
import { HomeLayout } from '@/components/layouts/home-layout';
import { TagsList } from '@/features/tags/components/tags-list';

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
