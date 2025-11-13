import { Link } from '@/components/ui/link/link';
import { useUser } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { formatDate } from '@/utils/format';

import { useArticle } from '../api/get-article';

export const ArticleMeta = ({ slug }: { slug: string }) => {
  const user = useUser();

  const articleQuery = useArticle({ slug });
  if (articleQuery.isLoading) {
    return <div className="article-meta">Loading...</div>;
  }

  const article = articleQuery.data?.article;
  if (!article) {
    return <div className="article-meta">Error occurs please try again</div>;
  }

  return (
    <div className="article-meta">
      <Link to={`/profile/${article?.author.username}`}>
        <img src={article?.author.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${article?.author.username}`} className="author">
          {article?.author.username}
        </Link>
        <span className="date">
          {article?.createdAt ? formatDate(Date.parse(article?.createdAt)) : ''}
        </span>
      </div>
      <button
        className={
          'btn btn-sm ' +
          (article.author.following ? 'btn-secondary' : 'btn-outline-secondary')
        }
      >
        <i className="ion-plus-round"></i>
        &nbsp; {article?.author.following ? 'Unfollow' : 'Follow'}{' '}
        {article?.author.username}{' '}
        <span className="counter">({article?.author.followersCount || 0})</span>
      </button>
      &nbsp;&nbsp;
      <button
        className={
          'btn btn-sm ' +
          (article.favorited ? 'btn-primary' : 'btn-outline-primary')
        }
      >
        <i className="ion-heart"></i>
        &nbsp; {article?.favorited ? 'Unfavorite' : 'Favorite'} Post
        <span className="counter">({article?.favoritesCount || 0})</span>
      </button>
      <Authorization
        policyCheck={POLICIES['article:edit'](user.data?.user, article)}
      >
        <button className="btn btn-sm btn-outline-secondary">
          <i className="ion-edit"></i> Edit Article
        </button>
      </Authorization>
      <Authorization
        policyCheck={POLICIES['article:delete'](user.data?.user, article)}
      >
        <button className="btn btn-sm btn-outline-danger">
          <i className="ion-trash-a"></i> Delete Article
        </button>
      </Authorization>
    </div>
  );
};
