import { useParams } from 'react-router';

import { AppLayout } from '@/components/layouts/app-layout';
import { useArticle } from '@/features/articles/api/get-article';
import { ArticleMeta } from '@/features/articles/components/article-meta';
import { ArticleView } from '@/features/articles/components/article-view';
import { CommentsList } from '@/features/comments/components/comments-list';
import { CommentForm } from '@/features/comments/components/comment-form';

const ArticleRoute = () => {
  const params = useParams();
  const slug = params.slug as string;

  const articleQuery = useArticle({ slug });
  const article = articleQuery.data?.article;

  return (
    <AppLayout title={article?.title || 'Article'}>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article?.title}</h1>

            <ArticleMeta slug={slug} />
          </div>
        </div>

        <div className="page container">
          <ArticleView slug={slug} />

          <hr />

          <div className="article-actions">
            <ArticleMeta slug={slug} />
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <CommentForm slug={slug} />

              <CommentsList slug={slug} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ArticleRoute;
