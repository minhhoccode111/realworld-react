import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { ProfilePreviewResponse } from '@/types/api';

import { getProfileQueryOptions } from './get-profile';

const unfollowProfile = ({
  username,
}: {
  username: string;
}): Promise<ProfilePreviewResponse> => {
  return api.delete(`/profiles/${username}/follow`);
};

type UseCreateUnfollowOptions = {
  username: string;
  mutationConfig?: MutationConfig<typeof unfollowProfile>;
};

export const useCreateUnfollowOptions = ({
  username,
  mutationConfig,
}: UseCreateUnfollowOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      // TODO: invalidate get feed
      queryClient.setQueryData(
        getProfileQueryOptions({ username }).queryKey,
        data,
      );
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: unfollowProfile,
  });
};
