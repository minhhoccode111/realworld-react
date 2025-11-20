import { useNavigate, useSearchParams } from 'react-router';

import { Link } from '@/components/ui/link/link';
import { useNotifications } from '@/components/ui/notifications';
import { TablePagination } from '@/components/ui/table/pagination';
import { LIMIT_DEFAULT } from '@/config/constants';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { formatDate } from '@/utils/format';

import { useFavoriteArticleOptions } from '../api/favorite-article';
import { useArticles } from '../api/get-articles';
import { useUnfavoriteArticleOptions } from '../api/unfavorite-article';

type ArticlesListProps = {
  isFeed?: boolean;
  author?: string;
  favorited?: string;
};

export const ArticlesList = ({
  isFeed = false,
  author = '',
  favorited = '',
}: ArticlesListProps) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);

  const filteredSearchParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    if (key !== 'page') {
      filteredSearchParams.append(key, value);
    }
  });
  const queries = filteredSearchParams.toString();

  const user = useUser();
  const articlesQuery = useArticles({
    isFeed,
    author: author || undefined,
    favorited: favorited || undefined,
    tag: searchParams.get('tag') || undefined,
    limit: LIMIT_DEFAULT,
    offset: (currentPage - 1) * LIMIT_DEFAULT,
  });

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

  if (user.isLoading || articlesQuery.isLoading) {
    return <div className="article-preview">Loading...</div>;
  }

  const articles = articlesQuery.data?.articles;

  if (!articlesQuery.data || !articles) {
    return (
      <div className="article-preview">Error occurs please try again.</div>
    );
  }

  if (!articles.length) {
    return <div className="article-preview">No Articles Found</div>;
  }

  return (
    <>
      {articles.map((a) => (
        <div key={a.slug} className="article-preview">
          <div className="article-meta">
            <Link to={paths.profile.root.getHref(a.author.username)}>
              <img src={a.author.image} />
            </Link>
            <div className="info">
              <Link
                to={paths.profile.root.getHref(a.author.username)}
                className="author"
              >
                {a.author.username}
              </Link>
              <span className="date">
                {formatDate(Date.parse(a.createdAt))}
              </span>
            </div>
            <button
              disabled={
                createFavoriteMutation.isPending ||
                deleteFavoriteMutation.isPending
              }
              onClick={() => {
                if (!user.data) {
                  navigate(paths.login.getHref(location.pathname));
                  return;
                }
                if (a.favorited) {
                  deleteFavoriteMutation.mutate({ slug: a.slug });
                } else {
                  createFavoriteMutation.mutate({ slug: a.slug });
                }
              }}
              className={
                'btn btn-sm pull-xs-right ' +
                (a.favorited ? 'btn-primary' : 'btn-outline-primary')
              }
            >
              <i className="ion-heart"></i>

              {createFavoriteMutation.isPending ||
              deleteFavoriteMutation.isPending ? (
                '...'
              ) : (
                <>
                  <span className="counter"> {a?.favoritesCount || 0}</span>
                </>
              )}
            </button>
          </div>
          <Link
            to={paths.article.read.getHref(a.slug)}
            className="preview-link"
          >
            <h1>{a.title}</h1>
            <p>{a.description}</p>
            <span>Read more...</span>
            {a.tagList && !!a.tagList.length && (
              <ul className="tag-list">
                {a.tagList.map((t) => (
                  <li key={t} className="tag-default tag-pill tag-outline">
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </Link>
        </div>
      ))}

      <TablePagination
        totalPages={Math.floor(
          (articlesQuery.data?.total + LIMIT_DEFAULT - 1) / LIMIT_DEFAULT,
        )}
        currentPage={currentPage}
        rootUrl={''}
        queries={queries}
      />
    </>
  );
};
