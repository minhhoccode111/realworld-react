import { ArticlesList } from '@/features/articles/components/articles-list';
import { useParams } from 'react-router';

const ProfilePostsRoute = () => {
  const params = useParams();
  const username = params.username as string;

  return <ArticlesList author={username} />;
};

export default ProfilePostsRoute;
