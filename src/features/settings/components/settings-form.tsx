import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUser } from '@/lib/auth';
import {
  updateProfileInputSchema,
  useUpdateProfile,
} from '@/features/settings/api/update-profile';
import { useNotifications } from '@/components/ui/notifications';

export const SettingsForm = () => {
  const user = useUser();
  const { addNotification } = useNotifications();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileInputSchema),
    defaultValues: {
      email: user.data?.user.email ?? '',
      username: user.data?.user.username ?? '',
      bio: user.data?.user.bio ?? '',
      image: user.data?.user.image ?? '',
      password: '',
    },
  });

  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Updated',
        });
      },
    },
  });

  const onSubmit = handleSubmit((values) => {
    updateProfileMutation.mutate({
      data: {
        email: values.email,
        username: values.username,
        bio: values.bio,
        image: values.image,
        password: values.password,
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
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

        {Object.entries(errors).length > 0 && (
          <ul className="error-messages">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error?.message?.toString()}</li>
            ))}
          </ul>
        )}

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={updateProfileMutation.isPending}
        >
          Update Settings{updateProfileMutation.isPending ? '...' : ''}
        </button>
      </fieldset>
    </form>
  );
};
