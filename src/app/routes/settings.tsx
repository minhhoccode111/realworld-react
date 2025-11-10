import { SettingsLayout } from '@/components/layouts';
import { AppLayout } from '@/components/layouts/app-layout';
import { SettingsForm } from '@/features/settings/components/settings-form';

const SettingsRoute = () => {
  return (
    <AppLayout title="Settings">
      <SettingsLayout>
        <SettingsForm />
      </SettingsLayout>
    </AppLayout>
  );
};

export default SettingsRoute;
