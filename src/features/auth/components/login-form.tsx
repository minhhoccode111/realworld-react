import { useSearchParams } from 'react-router';

import { Form } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';
import { Link } from '@/components/ui/link';
import { useNotifications } from '@/components/ui/notifications';

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
      <p className="text-xs-center">
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
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Email"
                {...register('email')}
              />
            </fieldset>

            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Password"
                {...register('password')}
              />
            </fieldset>

            {Object.entries(formState.errors).length > 0 && (
              <ul className="error-messages">
                {Object.entries(formState.errors).map(([field, error]) => (
                  <li key={field}>{error?.message?.toString()}</li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              className="btn btn-lg btn-primary pull-xs-right"
            >
              {login.isPending ? <span>Loading...</span> : <span>Sign in</span>}
            </button>
          </>
        )}
      </Form>
    </>
  );
};
