import { useParams } from 'react-router';

import { ArticlesList } from '@/features/articles/components/articles-list';

const ProfileFavoritesRoute = () => {
  const params = useParams();
  const username = params.username as string;

  return <ArticlesList favorited={username} />;
};

export default ProfileFavoritesRoute;
