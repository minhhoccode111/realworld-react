import { Outlet, useParams } from 'react-router';

import { AppLayout } from '@/components/layouts';
import { ProfileLayout } from '@/features/profiles/components/profile-layout';

const ProfileRoot = () => {
  const params = useParams();
  const username = params.username as string;

  return (
    <AppLayout title="Profile">
      <ProfileLayout username={username}>
        <Outlet />
      </ProfileLayout>
    </AppLayout>
  );
};

export default ProfileRoot;
