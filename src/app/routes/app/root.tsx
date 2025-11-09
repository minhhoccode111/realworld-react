import { Outlet } from 'react-router';

import { DashboardLayout } from '@/components/layouts';

const AppRoot = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default AppRoot;
