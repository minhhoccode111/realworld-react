import { Form } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import {
  updateProfileInputSchema,
  useUpdateProfile,
} from '@/features/auth/api/update-profile';
import { useUser } from '@/lib/auth';

type SettingsFormProps = {
  onSuccess?: () => void;
};

export const SettingsForm = ({ onSuccess }: SettingsFormProps) => {
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
      onSubmit={(values) => updateProfileMutation.mutate(values)}
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
    >
      {({ register, formState }) => (
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              {...register('image')}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Username"
              {...register('username')}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              {...register('bio')}
            ></textarea>
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
              placeholder="New Password"
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
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? 'Loading...' : 'Update Settings'}
          </button>
        </fieldset>
      )}
    </Form>
  );
};
