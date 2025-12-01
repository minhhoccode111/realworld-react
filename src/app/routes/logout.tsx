import { useNavigate, useSearchParams } from 'react-router';

import { AppLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useLogout } from '@/lib/auth';

const LogoutRoute = () => {
  const { addNotification } = useNotifications();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const navigate = useNavigate();
  const logout = useLogout({
    onSuccess: () => {
      addNotification({ type: 'success', title: 'Sign out succeed' });
      navigate(paths.login.getHref(redirectTo), { replace: true });
    },
  });

  return (
    <AppLayout title="Sign out">
      <div className="container my-8 space-y-4 px-2">
        <div className="text-center py-4">
          <h1 className="text-4xl font-semibold text-gray-900">Sign out</h1>
        </div>

        <p className="text-center text-base text-gray-600 md:text-lg">
          Do you want to sign out?
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link to={redirectTo || paths.home.getHref()}>
            <Button variant="default">No</Button>
          </Link>

          <Button variant="realworld" onClick={() => logout.mutate({})}>
            Yes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LogoutRoute;
