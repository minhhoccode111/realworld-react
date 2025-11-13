import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ProfilePreviewResponse } from '@/types/api';

const getProfile = ({
  username,
}: {
  username: string;
}): Promise<ProfilePreviewResponse> => {
  return api.get(`/profiles/${username}`);
};

export const getProfileQueryOptions = ({ username }: { username: string }) => {
  return queryOptions({
    queryKey: ['profiles', username],
    queryFn: () => getProfile({ username }),
  });
};

type UseProfileOptions = {
  username: string;
  queryConfig?: QueryConfig<typeof getProfileQueryOptions>;
};

export const useProfile = ({ username, queryConfig }: UseProfileOptions) => {
  return useQuery({
    ...getProfileQueryOptions({ username }),
    ...queryConfig,
  });
};
