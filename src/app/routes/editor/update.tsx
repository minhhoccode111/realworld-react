import { useParams } from 'react-router';

import { UpdateArticleForm } from '@/features/articles/components/update-article-form';

const EditorUpdateRoute = () => {
  const params = useParams();
  const slug = params.slug as string;

  return <UpdateArticleForm slug={slug} />;
};

export default EditorUpdateRoute;
