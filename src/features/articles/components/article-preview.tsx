import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';

import { Link } from '@/components/ui/link/link';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';
import { getProfileQueryOptions } from '@/features/profiles/api/get-profile';
import { useUser } from '@/lib/auth';
import { ArticlePreview as ArticlePreviewType } from '@/types/api';
import { formatDate } from '@/utils/format';

import { useFavoriteArticle } from '../api/favorite-article';
import { getArticleQueryOptions } from '../api/get-article';
import { getArticlesQueryOptions } from '../api/get-articles';
import { useUnfavoriteArticle } from '../api/unfavorite-article';

export const ArticlePreview = ({
  article,
}: {
  article: ArticlePreviewType;
}) => {
  const { addNotification } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUser();
  const queryClient = useQueryClient();

  const createFavoriteMutation = useFavoriteArticle({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Article Favorited',
        });
      },
    },
  });

  const deleteFavoriteMutation = useUnfavoriteArticle({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Article Unfavorited',
        });
      },
    },
  });

  return (
    <div key={article.slug} className="article-preview">
      <div className="article-meta">
        <Link
          onMouseEnter={() => {
            // prefetch get-profile and get-articles-author of current article's author
            queryClient.prefetchQuery(
              getProfileQueryOptions({ username: article.author.username }),
            );
            queryClient.prefetchQuery(
              getArticlesQueryOptions({
                author: article.author.username,
              }),
            );
          }}
          to={paths.profile.root.getHref(article.author.username)}
        >
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link
            onMouseEnter={() => {
              // prefetch get-profile and get-articles-author of current article's author
              queryClient.prefetchQuery(
                getProfileQueryOptions({ username: article.author.username }),
              );
              queryClient.prefetchQuery(
                getArticlesQueryOptions({
                  author: article.author.username,
                }),
              );
            }}
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
        onMouseEnter={() => {
          // prefetch get-profile, get-article, and get-comments-article of current article
          queryClient.prefetchQuery(
            getProfileQueryOptions({ username: article.author.username }),
          );
          queryClient.prefetchQuery(
            getArticleQueryOptions({ slug: article.slug }),
          );
          queryClient.prefetchInfiniteQuery(
            getInfiniteCommentsQueryOptions({ slug: article.slug, limit: 5 }),
          );
        }}
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
