import { Outlet } from 'react-router';

import { AppLayout, ProfileLayout } from '@/components/layouts';

const ProfileRoot = () => {
  return (
    <AppLayout title="Profile">
      <ProfileLayout>
        <Outlet />
      </ProfileLayout>
    </AppLayout>
  );
};

export default ProfileRoot;
