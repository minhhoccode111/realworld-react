import { Link } from '@/components/ui/link/link';
import { Authorization, POLICIES } from '@/lib/authorization';
import { formatDate } from '@/utils/format';
import { useArticle } from '../api/get-article';
import { useUser } from '@/lib/auth';

export const ArticleMeta = ({ slug }: { slug: string }) => {
  const user = useUser();

  const articleQuery = useArticle({ slug });
  const article = articleQuery.data?.article;

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
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; {article?.author.following ? 'Unfollow' : 'Follow'}{' '}
        {article?.author.username}{' '}
        <span className="counter">({article?.author.followersCount || 0})</span>
      </button>
      &nbsp;&nbsp;
      <button className="btn btn-sm btn-outline-primary">
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
