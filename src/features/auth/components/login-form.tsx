import { useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button/button';
import { FieldSet } from '@/components/ui/field';
import { Form, Input } from '@/components/ui/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess: () => onSuccess(),
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <>
      <p className="text-center text-base text-gray-600 md:text-lg">
        <Link
          className="text-realworld transition-colors hover:text-realworld-hover hover:underline"
          to={paths.register.getHref(redirectTo)}
        >
          Need an account?
        </Link>
      </p>

      <Form
        onSubmit={(values) => {
          login.mutate(values);
        }}
        schema={loginInputSchema}
        className=""
      >
        {({ register, formState }) => (
          <>
            <FieldSet>
              <Input
                className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
                type="text"
                placeholder="Email"
                autoComplete="username"
                registration={register('email')}
              />
            </FieldSet>

            <FieldSet>
              <Input
                className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                registration={register('password')}
              />
            </FieldSet>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                size="xl"
                variant="realworld"
                disabled={login.isPending}
                isLoading={login.isPending}
              >
                Sign in
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
