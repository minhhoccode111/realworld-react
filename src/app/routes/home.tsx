import { AppLayout } from '@/components/layouts/app-layout';
import { HomeLayout } from '@/components/layouts/home-layout';
import { Articles } from '@/features/articles/components/articles';

const HomeRoute = () => {
  return (
    <AppLayout title="Home">
      <HomeLayout>
        <Articles />
      </HomeLayout>
    </AppLayout>
  );
};

export default HomeRoute;
