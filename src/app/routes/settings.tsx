import { SettingsLayout } from '@/components/layouts';
import { AppLayout } from '@/components/layouts/app-layout';
import { UpdateProfileForm } from '@/features/auth/components/update-profile-form';

const SettingsRoute = () => {
  return (
    <AppLayout title="Settings">
      <SettingsLayout>
        <UpdateProfileForm />
      </SettingsLayout>
    </AppLayout>
  );
};

export default SettingsRoute;
