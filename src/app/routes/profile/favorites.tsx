import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, useParams } from 'react-router';

import { LIMIT_DEFAULT } from '@/config/constants';
import { getArticlesQueryOptions } from '@/features/articles/api/get-articles';
import { ArticlesList } from '@/features/articles/components/articles-list';
import { getProfileQueryOptions } from '@/features/profiles/api/get-profile';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ request, params }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || 1);
    const username = params.username as string;

    const profileQuery = getProfileQueryOptions({ username });
    const articlesQuery = getArticlesQueryOptions({
      favorited: username,
      limit: LIMIT_DEFAULT,
      offset: (page - 1) * LIMIT_DEFAULT,
    });

    const promises = [
      queryClient.getQueryData(profileQuery.queryKey) ??
        (await queryClient.fetchQuery(profileQuery)),
      queryClient.getQueryData(articlesQuery.queryKey) ??
        (await queryClient.fetchQuery(articlesQuery)),
    ] as const;

    const [profile, articles] = await Promise.all(promises);

    return { profile, articles };
  };

const ProfileFavoritesRoute = () => {
  const params = useParams();
  const username = params.username as string;

  return <ArticlesList favorited={username} />;
};

export default ProfileFavoritesRoute;
