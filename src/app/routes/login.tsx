import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';
import { AppLayout } from '@/components/layouts';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AppLayout title="Sign in">
      <AuthLayout title="Sign in">
        <LoginForm
          onSuccess={() => {
            navigate(`${redirectTo ? `${redirectTo}` : paths.home.getHref()}`, {
              replace: true,
            });
          }}
        />
      </AuthLayout>
    </AppLayout>
  );
};

export default LoginRoute;
