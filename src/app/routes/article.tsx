import { useParams } from 'react-router';

import { AppLayout } from '@/components/layouts/app-layout';
import { Link } from '@/components/ui/link/link';
import { MDPreview } from '@/components/ui/md-preview';
import { useArticle } from '@/features/articles/api/get-article';
import { useUser } from '@/lib/auth';
import { formatDate } from '@/utils/format';

const ArticleRoute = () => {
  const params = useParams();
  const slug = params.slug as string;

  const user = useUser();

  const articleQuery = useArticle({ slug });
  const article = articleQuery.data?.article;

  return (
    <AppLayout title={article?.title || 'Article'}>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article?.title}</h1>

            <div className="article-meta">
              <Link to={`/profile/${article?.author.username}`}>
                <img src={article?.author.image} />
              </Link>
              <div className="info">
                <Link
                  to={`/profile/${article?.author.username}`}
                  className="author"
                >
                  {article?.author.username}
                </Link>
                <span className="date">
                  {article?.createdAt
                    ? formatDate(Date.parse(article?.createdAt))
                    : ''}
                </span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; {article?.author.following ? 'Unfollow' : 'Follow'}{' '}
                {article?.author.username}{' '}
                <span className="counter">
                  ({article?.author.followersCount})
                </span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; {article?.favorited ? 'Unfavorite' : 'Favorite'} Post
                <span className="counter">({article?.favoritesCount})</span>
              </button>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-edit"></i> Edit Article
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ion-trash-a"></i> Delete Article
              </button>
            </div>
          </div>
        </div>

        <div className="page container">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article?.description}</p>
              <MDPreview value={article?.body || ''}></MDPreview>

              <ul className="tag-list">
                {article?.tagList.map((v) => (
                  <li key={v} className="tag-default tag-pill tag-outline">
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <Link to={`/profile/${article?.author.username}`}>
                <img src={article?.author.image} />
              </Link>
              <div className="info">
                <Link
                  to={`/profile/${article?.author.username}`}
                  className="author"
                >
                  {article?.author.username}
                </Link>
                <span className="date">
                  {article?.createdAt
                    ? formatDate(Date.parse(article?.createdAt))
                    : ''}
                </span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; {article?.author.following ? 'Unfollow' : 'Follow'}{' '}
                {article?.author.username}{' '}
                <span className="counter">
                  ({article?.author.followersCount})
                </span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; {article?.favorited ? 'Unfavorite' : 'Favorite'} Post
                <span className="counter">({article?.favoritesCount})</span>
              </button>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-edit"></i> Edit Article
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="ion-trash-a"></i> Delete Article
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img
                    src={user.data?.user.image}
                    className="comment-author-img"
                  />
                  <button className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ArticleRoute;
