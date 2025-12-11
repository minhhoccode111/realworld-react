import { useSearchParams } from 'react-router';

import { AppLayout } from '@/components/layouts';
import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';

const RegisterRoute = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AppLayout title="Sign up">
      <AuthLayout title="Sign up">
        <RegisterForm
          onSuccess={() => {
            // NOTE: force full refresh for jwt-in-cookie to work properly
            window.location.href = redirectTo || paths.home.getHref();
          }}
        />
      </AuthLayout>
    </AppLayout>
  );
};

export default RegisterRoute;
