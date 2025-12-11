import { useSearchParams } from 'react-router';

import { AppLayout } from '@/components/layouts';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';

const LoginRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AppLayout title="Sign in">
      <AuthLayout title="Sign in">
        <LoginForm
          onSuccess={() => {
            // NOTE: force full refresh for jwt-in-cookie to work properly
            window.location.href = redirectTo || paths.home.getHref();
          }}
        />
      </AuthLayout>
    </AppLayout>
  );
};

export default LoginRoute;
