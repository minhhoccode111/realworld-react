import { Button } from '@/components/ui/button/button';
import { FieldSet } from '@/components/ui/field';
import { Form, Input, Textarea } from '@/components/ui/form';
import { FormErrors } from '@/components/ui/form/form-errors';
import { useNotifications } from '@/components/ui/notifications';
import {
  updateProfileInputSchema,
  useUpdateProfile,
} from '@/features/auth/api/update-profile';
import { useUser } from '@/lib/auth';

type SettingsFormProps = {
  onSuccess?: () => void;
};

export const UpdateProfileForm = ({ onSuccess }: SettingsFormProps) => {
  const user = useUser();
  const { addNotification } = useNotifications();

  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        onSuccess?.();
        addNotification({
          type: 'success',
          title: 'Profile Updated',
        });
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => updateProfileMutation.mutate({ data: values })}
      schema={updateProfileInputSchema}
      options={{
        defaultValues: {
          image: user.data?.user.image ?? '',
          username: user.data?.user.username ?? '',
          bio: user.data?.user.bio ?? '',
          email: user.data?.user.email ?? '',
          password: '',
        },
      }}
      className="space-y-8"
    >
      {({ register, formState }) => (
        <>
          <FieldSet>
            <Input
              className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
              type="text"
              placeholder="URL of profile picture"
              autoComplete="off"
              registration={register('image')}
            />
          </FieldSet>

          <FieldSet>
            <Input
              className="w-full rounded-lg border border-gray-300 px-4 py-6 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
              type="text"
              placeholder="Your Username"
              autoComplete="off"
              registration={register('username')}
            />
          </FieldSet>

          <FieldSet>
            <Textarea
              className="w-full rounded-lg border border-gray-300 p-4 text-base transition-all placeholder:text-gray-400 focus:border-realworld focus:outline-none focus:ring-2 focus:ring-realworld/20"
              rows={6}
              placeholder="Short bio about you"
              registration={register('bio')}
            />
          </FieldSet>

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
              placeholder="New Password"
              autoComplete="current-password"
              registration={register('password')}
            />
          </FieldSet>

          <FormErrors
            className="px-4 text-sm text-red-500"
            errors={formState.errors}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              size="xl"
              variant="realworld"
              disabled={updateProfileMutation.isPending}
              isLoading={updateProfileMutation.isPending}
            >
              Update Settings
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};
