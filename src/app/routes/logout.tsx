import { AppLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useLogout } from '@/lib/auth';
import { useNavigate } from 'react-router';

const LogoutRoute = () => {
  const navigate = useNavigate();
  const logout = useLogout({
    onSuccess: () => navigate(paths.login.getHref(location.pathname)),
  });

  return (
    <AppLayout title="Sign out">
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign out</h1>

              <p className="text-xs-center">Do you want to sign out?</p>

              <p className="text-xs-center">
                <Button onClick={() => logout.mutate({})}>Yes</Button>{' '}
                <Link
                  to={paths.home.getHref()}
                  className="btn btn-outline-secondary"
                >
                  No
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LogoutRoute;
