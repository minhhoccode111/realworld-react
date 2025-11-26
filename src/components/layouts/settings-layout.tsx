import { useNavigate } from 'react-router';

import { paths } from '@/config/paths';
import { useLogout } from '@/lib/auth';

export const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const logout = useLogout({
    onSuccess: () => navigate(paths.home.getHref(), { replace: true }),
  });

  return (
    <div className="settings-page">
      <div className="page container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            {children}

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
  );
};
