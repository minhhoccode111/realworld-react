import { Link, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/button/button';
import { Form, Input } from '@/components/ui/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useRegister, registerInputSchema } from '@/lib/auth';
import { FieldSet } from '@/components/ui/field';

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
      <p className="text-center text-base md:text-lg text-gray-600">
        <Link
          className="text-realworld hover:text-realworld-hover hover:underline transition-colors"
          to={paths.login.getHref(redirectTo)}
        >
          Have an account?
        </Link>
      </p>

      <Form
        onSubmit={(values) => {
          registering.mutate(values);
        }}
        schema={registerInputSchema}
        className=""
      >
        {({ register, formState }) => (
          <>
            <FieldSet>
              <Input
                className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base placeholder-gray-400 transition-all focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld focus:ring-opacity-20"
                type="text"
                placeholder="Username"
                autoComplete="off"
                registration={register('username')}
              />
            </FieldSet>

            <FieldSet>
              <Input
                className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base placeholder-gray-400 transition-all focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld focus:ring-opacity-20"
                type="text"
                placeholder="Email"
                autoComplete="username"
                registration={register('email')}
              />
            </FieldSet>

            <FieldSet>
              <Input
                className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base placeholder-gray-400 transition-all focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld focus:ring-opacity-20"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                registration={register('password')}
              />
            </FieldSet>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                size="xl"
                variant="realworld"
                disabled={registering.isPending}
                isLoading={registering.isPending}
              >
                Sign up
              </Button>
            </div>

            <FormErrors
              className="text-sm text-red-500"
              errors={formState.errors}
            />
          </>
        )}
      </Form>
    </>
  );
};
