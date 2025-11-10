import { useNavigate } from 'react-router';

import { AppLayout } from '@/components/layouts/app-layout';
import { useLogout } from '@/lib/auth';
import { paths } from '@/config';
import { SettingsForm } from '@/features/settings/components/settings-form';

const SettingsRoute = () => {
  const navigate = useNavigate();
  const logout = useLogout({
    onSuccess: () => navigate(paths.home.getHref()),
  });

  return (
    <AppLayout title="Settings">
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <SettingsForm />

              <hr />
              <button
                className="btn btn-outline-danger"
                onClick={() => logout.mutate({})}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsRoute;
