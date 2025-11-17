import { Link } from '@/components/ui/link/link';
import { useNavigate, useSearchParams } from 'react-router';
import { useArticles } from '../api/get-articles';
import { paths } from '@/config/paths';
import { formatDate } from '@/utils/format';
import { useUnfavoriteArticleOptions } from '../api/unfavorite-article';
import { useNotifications } from '@/components/ui/notifications';
import { useFavoriteArticleOptions } from '../api/favorite-article';
import { useUser } from '@/lib/auth';
import { TablePagination } from '@/components/ui/table/pagination';

export const ArticlesList = ({ isFeed }: { isFeed: boolean }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentTag = searchParams.get('tag');
  const currentPage = +(searchParams.get('page') || 1);
  const limit = 10;

  const user = useUser();
  const articlesQuery = useArticles({
    isFeed,
    tag: currentTag || undefined,
    limit,
    offset: (currentPage - 1) * limit,
  });

  const createFavoriteMutation = useFavoriteArticleOptions({
    mutationConfig: {
      onSuccess: (data) => {
        addNotification({
          type: 'success',
          title: `Favorited ${data.article.title}`,
        });
      },
    },
  });

  const deleteFavoriteMutation = useUnfavoriteArticleOptions({
    mutationConfig: {
      onSuccess: (data) => {
        addNotification({
          type: 'success',
          title: `Unfavorited ${data.article.title}`,
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
                  deleteFavoriteMutation.mutate(a.slug);
                } else {
                  createFavoriteMutation.mutate(a.slug);
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
            {a.tagList && a.tagList.length && (
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
        totalPages={Math.floor((articlesQuery.data?.total + limit - 1) / limit)}
        currentPage={currentPage}
        rootUrl=""
        queries={currentTag ? `tag=${currentTag}` : ''}
      />

      {/* <ul className="pagination">
        <li className="page-item active">
          <a className="page-link" href="">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="">
            2
          </a>
        </li>
      </ul> */}
    </>
  );
};
