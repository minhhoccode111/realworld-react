import { QueryClient } from '@tanstack/react-query';
import { useParams, LoaderFunctionArgs } from 'react-router';

import { AppLayout } from '@/components/layouts/app-layout';
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

  if (articleQuery.isLoading) {
    return (
      <AppLayout title="Article">
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>Loading...</h1>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!article) {
    return (
      <AppLayout title="Article">
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>Error occurs please try again.</h1>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={article.title || 'Article'}>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>

            <ArticleMeta slug={slug} />
          </div>
        </div>

        <div className="page container">
          <ArticleView slug={slug} />

          <hr />

          <div className="article-actions">
            <ArticleMeta slug={slug} />
          </div>

          <Comments slug={slug} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ArticleRoute;
