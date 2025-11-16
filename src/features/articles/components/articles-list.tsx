import { Link } from '@/components/ui/link/link';
import { useSearchParams } from 'react-router';
import { useArticles } from '../api/get-articles';
import { paths } from '@/config/paths';
import { formatDate } from '@/utils/format';

export const ArticlesList = ({ isFeed }: { isFeed: boolean }) => {
  const [searchParams] = useSearchParams();
  const currentTag = searchParams.get('tag');

  const articlesQuery = useArticles({ isFeed, tag: currentTag || undefined });

  if (articlesQuery.isLoading) {
    return <div className="article-preview">Loading...</div>;
  }

  const articles = articlesQuery.data?.articles;

  if (!articles) {
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
              className={
                'btn btn-sm pull-xs-right ' +
                (a.favorited ? 'btn-primary' : 'btn-outline-primary')
              }
            >
              <i className="ion-heart"></i> {a.favoritesCount}
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
    </>
  );
};
