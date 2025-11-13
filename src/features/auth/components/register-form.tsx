import { Link, useSearchParams } from 'react-router';

import { Form } from '@/components/ui/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useRegister, registerInputSchema } from '@/lib/auth';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { addNotification } = useNotifications();
  const registering = useRegister({
    onSuccess: () => {
      onSuccess();
      addNotification({ type: 'success', title: 'User created' });
    },
  });
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

            <FormErrors className="error-messages" errors={formState.errors} />

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
