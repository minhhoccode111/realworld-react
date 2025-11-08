import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { RegisterForm } from '@/features/auth/components/register-form';
import { AppLayout } from '@/components/layouts';

const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <AppLayout title="Sign up">
      <AuthLayout title="Sign up">
        <RegisterForm
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

export default RegisterRoute;
