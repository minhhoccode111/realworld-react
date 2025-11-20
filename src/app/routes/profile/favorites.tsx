import { ArticlesList } from '@/features/articles/components/articles-list';
import { useParams } from 'react-router';

const ProfileFavoritesRoute = () => {
  const params = useParams();
  const username = params.username as string;

  return <ArticlesList favorited={username} />;
};

export default ProfileFavoritesRoute;
