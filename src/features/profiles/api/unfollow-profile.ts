import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/config/constants';
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
  mutationConfig?: MutationConfig<typeof unfollowProfile>;
};

export const useCreateUnfollowOptions = ({
  mutationConfig,
}: UseCreateUnfollowOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getProfileQueryOptions({ username: data.profile.username }).queryKey,
        data,
      );

      // invalidate feed-articles query for current user
      queryClient.invalidateQueries({
        predicate: (query) => {
          if (!Array.isArray(query.queryKey)) return false;
          if (query.queryKey[0] !== queryKeys.articles) return false;

          const params = query.queryKey[1];
          if (typeof params !== 'object' || params === null) return false;

          return params.isFeed === true;
        },
      });

      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: unfollowProfile,
  });
};
