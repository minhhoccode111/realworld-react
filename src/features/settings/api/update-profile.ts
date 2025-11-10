import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { useUser } from '@/lib/auth';
import { MutationConfig } from '@/lib/react-query';

export const updateProfileInputSchema = z
  .object({
    email: z.string().email('Invalid email').optional(),
    username: z.string().optional(),
    bio: z.string().optional(),
    image: z.string().optional(),
    password: z.string().optional(),
  })
  .refine(
    (data) =>
      !!data.email ||
      !!data.username ||
      !!data.bio ||
      !!data.image ||
      !!data.password,
    {
      message: 'At least one field must be provided for update',
      path: ['email'], // Attach the error to the email field, or any other field
    },
  );

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = ({ data }: { data: UpdateProfileInput }) => {
  return api.put(`/user`, { user: data });
};

type UseUpdateProfileOptions = {
  mutationConfig?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({
  mutationConfig,
}: UseUpdateProfileOptions = {}) => {
  const { refetch: refetchUser } = useUser();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      refetchUser();
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateProfile,
  });
};
