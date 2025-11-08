import { Link, useSearchParams } from 'react-router';

import { Form } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useRegister, registerInputSchema } from '@/lib/auth';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <>
      <p className="text-xs-center">
        <Link to={paths.login.getHref(redirectTo)}>Have an account?</Link>
      </p>

      <Form
        onSubmit={(values) => {
          registering.mutate(values);
        }}
        schema={registerInputSchema}
      >
        {({ register, formState }) => (
          <>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Username"
                {...register('username')}
              />
            </fieldset>

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
              {formState.errors.username && (
                <li>Username: {formState.errors.username.message}</li>
              )}
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
              {registering.isPending ? (
                <span>Loading...</span>
              ) : (
                <span>Sign up</span>
              )}
            </button>
          </>
        )}
      </Form>
    </>
  );
};
