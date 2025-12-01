import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs, useParams } from 'react-router';

import { getArticleQueryOptions } from '@/features/articles/api/get-article';
import { UpdateArticleForm } from '@/features/articles/components/update-article-form';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const slug = params.slug as string;
    const articleQuery = getArticleQueryOptions({ slug });

    const article =
      queryClient.getQueryData(articleQuery.queryKey) ??
      (await queryClient.fetchQuery(articleQuery));

    return { article };
  };

const EditorUpdateRoute = () => {
  const params = useParams();
  const slug = params.slug as string;

  return <UpdateArticleForm slug={slug} />;
};

export default EditorUpdateRoute;
