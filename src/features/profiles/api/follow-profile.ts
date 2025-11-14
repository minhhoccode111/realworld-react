import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfileQueryOptions } from './get-profile';
import { ProfilePreviewResponse } from '@/types/api';

const followProfile = ({
  username,
}: {
  username: string;
}): Promise<ProfilePreviewResponse> => {
  return api.post(`/profiles/${username}/follow`);
};

type UseCreateFollowOptions = {
  username: string;
  mutationConfig?: MutationConfig<typeof followProfile>;
};

export const useCreateFollowOptions = ({
  username,
  mutationConfig,
}: UseCreateFollowOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getProfileQueryOptions({ username }).queryKey,
        data,
      );
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: followProfile,
  });
};
