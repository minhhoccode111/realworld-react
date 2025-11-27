import { queryOptions, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/config/constants';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { ProfilePreviewResponse } from '@/types/api';

type ProfileQueryParams = {
  username: string;
};

const getProfile = ({
  username,
}: ProfileQueryParams): Promise<ProfilePreviewResponse> => {
  return api.get(`/profiles/${username}`);
};

export const getProfileQueryOptions = ({ username }: ProfileQueryParams) => {
  return queryOptions({
    queryKey: [queryKeys.profile, username],
    queryFn: () => getProfile({ username }),
  });
};

type UseProfileOptions = ProfileQueryParams & {
  queryConfig?: QueryConfig<typeof getProfileQueryOptions>;
};

export const useProfile = ({ username, queryConfig }: UseProfileOptions) => {
  return useQuery({
    ...getProfileQueryOptions({ username }),
    ...queryConfig,
  });
};
