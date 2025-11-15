import { AppLayout } from '@/components/layouts/app-layout';
import { HomeLayout } from '@/components/layouts/home-layout';
import { Articles } from '@/features/articles/components/articles';
import { TagsList } from '@/features/tags/components/tags-list';

const HomeRoute = () => {
  return (
    <AppLayout title="Home">
      <HomeLayout>
        <Articles />
        <TagsList />
      </HomeLayout>
    </AppLayout>
  );
};

export default HomeRoute;
