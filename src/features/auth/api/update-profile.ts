import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { queryKeys } from '@/config/constants';
import { getProfileQueryOptions } from '@/features/profiles/api/get-profile';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { UserAuthResponse } from '@/types/api';

const emptyToUndef = (schema: z.ZodTypeAny) =>
  z.preprocess(
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    schema,
  );

export const updateProfileInputSchema = z
  .object({
    email: emptyToUndef(z.string().email('Invalid email').optional()),
    username: emptyToUndef(
      z
        .string()
        .min(2, 'Username must be at least 2 characters')
        .max(50, 'Username must be at most 50 characters')
        .regex(
          /^[a-zA-Z0-9_]+$/,
          'Username can only contain alphanumeric characters and underscores',
        )
        .optional(),
    ),
    password: emptyToUndef(
      z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must be at most 50 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(
          /[!@#~$%^&*()+|_{}<>?,./-]/,
          'Password must contain at least one special character',
        )
        .optional(),
    ),
    bio: emptyToUndef(
      z.string().max(255, 'Bio must be at most 255 characters').optional(),
    ),
    image: emptyToUndef(
      z
        .string()
        .max(2048, 'Image link must be at most 2048 characters')
        .optional(),
    ),
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: 'At least one field must be provided to update',
    path: [''],
  });

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = ({
  data,
}: {
  data: UpdateProfileInput;
}): Promise<UserAuthResponse> => {
  return api.put(`/user`, { user: data });
};

type UseUpdateProfileOptions = {
  mutationConfig?: MutationConfig<typeof updateProfile>;
};

export const useUpdateProfile = ({
  mutationConfig,
}: UseUpdateProfileOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      // update 'authenticated-user'
      queryClient.setQueryData([queryKeys.authenticatedUser], data);

      // invalidate 'profile' query
      queryClient.invalidateQueries({
        queryKey: getProfileQueryOptions({ username: data.user.username })
          .queryKey,
      });

      // invalidate every 'articles' query
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (!Array.isArray(query.queryKey)) return false;
          return query.queryKey[0] === queryKeys.articles;
        },
      });

      onSuccess?.(data, ...args);
    },

    ...restConfig,
    mutationFn: updateProfile,
  });
};
