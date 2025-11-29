import { useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { Form } from '@/components/ui/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { Link } from '@/components/ui/link';
import { useNotifications } from '@/components/ui/notifications';
import { Spinner } from '@/components/ui/spinner/spinner';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { addNotification } = useNotifications();
  const login = useLogin({
    onSuccess: () => {
      onSuccess();
      addNotification({ type: 'success', title: 'Welcome back!' });
    },
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <>
      <p className="text-center text-base md:text-lg">
        <Link to={paths.register.getHref(redirectTo)}>Need an account?</Link>
      </p>

      <Form
        onSubmit={(values) => {
          login.mutate(values);
        }}
        schema={loginInputSchema}
      >
        {({ register, formState }) => (
          <>
            <fieldset className="mb-4">
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                type="text"
                placeholder="Email"
                autoComplete="username"
                {...register('email')}
              />
            </fieldset>

            <fieldset className="mb-4">
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                {...register('password')}
              />
            </fieldset>

            <FormErrors
              className="text-center text-sm text-red-500"
              errors={formState.errors}
            />

            <Button
              type="submit"
              className="ml-auto flex items-center gap-4"
              size="lg"
              disabled={login.isPending}
              isLoading={login.isPending}
            >
              Sign in
            </Button>
          </>
        )}
      </Form>
    </>
  );
};
