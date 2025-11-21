import { useParams } from 'react-router';

import { ArticlesList } from '@/features/articles/components/articles-list';

const ProfilePostsRoute = () => {
  const params = useParams();
  const username = params.username as string;

  return <ArticlesList author={username} />;
};

export default ProfilePostsRoute;
