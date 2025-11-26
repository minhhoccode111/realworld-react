import { useLocation, useNavigate } from 'react-router';

import { Link } from '@/components/ui/link/link';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { ArticlePreview as ArticlePreviewType } from '@/types/api';
import { formatDate } from '@/utils/format';

import { useFavoriteArticleOptions } from '../api/favorite-article';
import { useUnfavoriteArticleOptions } from '../api/unfavorite-article';

export const ArticlePreview = ({
  article,
}: {
  article: ArticlePreviewType;
}) => {
  const { addNotification } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();

  const createFavoriteMutation = useFavoriteArticleOptions({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: `Article Favorited`,
        });
      },
    },
  });

  const deleteFavoriteMutation = useUnfavoriteArticleOptions({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: `Article Unfavorited`,
        });
      },
    },
  });

  return (
    <div key={article.slug} className="article-preview">
      <div className="article-meta">
        <Link to={paths.profile.root.getHref(article.author.username)}>
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link
            to={paths.profile.root.getHref(article.author.username)}
            className="author"
          >
            {article.author.username}
          </Link>
          <span className="date">
            {formatDate(Date.parse(article.createdAt))}
          </span>
        </div>
        <button
          disabled={
            createFavoriteMutation.isPending || deleteFavoriteMutation.isPending
          }
          onClick={() => {
            if (!user.data) {
              navigate(paths.login.getHref(location.pathname));
              return;
            }
            if (article.favorited) {
              deleteFavoriteMutation.mutate({ slug: article.slug });
            } else {
              createFavoriteMutation.mutate({ slug: article.slug });
            }
          }}
          className={
            'btn btn-sm pull-xs-right ' +
            (article.favorited ? 'btn-primary' : 'btn-outline-primary')
          }
        >
          <i className="ion-heart"></i>

          {createFavoriteMutation.isPending ||
          deleteFavoriteMutation.isPending ? (
            ' ...'
          ) : (
            <>
              <span className="counter"> {article?.favoritesCount || 0}</span>
            </>
          )}
        </button>
      </div>
      <Link
        to={paths.article.read.getHref(article.slug)}
        className="preview-link"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        {article.tagList && !!article.tagList.length && (
          <ul className="tag-list">
            {article.tagList.map((t) => (
              <li key={t} className="tag-default tag-pill tag-outline">
                {t}
              </li>
            ))}
          </ul>
        )}
      </Link>
    </div>
  );
};
