import { AppLayout } from '@/components/layouts/app-layout';
import { SettingsForm } from '@/features/settings/components/settings-form';
import { SettingsLayout } from '@/components/layouts';

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
