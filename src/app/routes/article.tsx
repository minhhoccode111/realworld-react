import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { AppLayout } from '@/components/layouts/app-layout';
import { Separator } from '@/components/ui/field/separator';
import {
  getArticleQueryOptions,
  useArticle,
} from '@/features/articles/api/get-article';
import { ArticleMeta } from '@/features/articles/components/article-meta';
import { ArticleView } from '@/features/articles/components/article-view';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';
import { Comments } from '@/features/comments/components/comments';

export const clientLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const slug = params.slug as string;

    const articleQuery = getArticleQueryOptions({ slug });
    const commentsQuery = getInfiniteCommentsQueryOptions({ slug });

    const promises = [
      queryClient.getQueryData(articleQuery.queryKey) ??
        (await queryClient.fetchQuery(articleQuery)),
      queryClient.getQueryData(commentsQuery.queryKey) ??
        (await queryClient.fetchInfiniteQuery(commentsQuery)),
    ] as const;

    const [article, comments] = await Promise.all(promises);

    return { article, comments };
  };

const ArticleRoute = () => {
  const params = useParams();
  const slug = params.slug as string;

  const articleQuery = useArticle({ slug });
  const article = articleQuery.data?.article;

  let title = '';

  if (articleQuery.isLoading) {
    title = 'Loading...';
  } else if (!article) {
    title = 'Error occurred. Please try again.';
  } else {
    title = article.title;
  }

  return (
    <AppLayout title={title || 'Article'}>
      <div className="bg-[#333] py-8 text-realworld-foreground shadow-inner">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-4xl font-semibold leading-tight">{title}</h1>
          <ArticleMeta slug={slug} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <ArticleView slug={slug} />

        <Separator className="my-8" />

        <div className="mb-8 flex justify-center">
          <ArticleMeta slug={slug} />
        </div>

        <Comments slug={slug} />
      </div>
    </AppLayout>
  );
};

export default ArticleRoute;
