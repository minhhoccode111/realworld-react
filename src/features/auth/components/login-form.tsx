import { useSearchParams } from 'react-router';

import { Form } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';
import { Link } from '@/components/ui/link';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <>
      <p className="text-xs-center">
        <Link to={paths.auth.register.getHref(redirectTo)}>
          Need an account?
        </Link>
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

            <ul className="error-messages">
              {formState.errors.email && (
                <li>Email: {formState.errors.email.message}</li>
              )}
              {formState.errors.password && (
                <li>Password: {formState.errors.password.message}</li>
              )}
            </ul>

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
