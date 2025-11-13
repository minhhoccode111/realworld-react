import { Link } from '@/components/ui/link/link';
import { useUser } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { formatDate } from '@/utils/format';

import { useArticle } from '../api/get-article';
import { useLocation, useNavigate } from 'react-router';
import { paths } from '@/config/paths';
import { useDeleteFavoriteOptions } from '@/features/favorites/api/delete-favorite';
import { useNotifications } from '@/components/ui/notifications';
import { useCreateFavoriteOptions } from '@/features/favorites/api/create-favorite';
import { useProfile } from '@/features/profiles/api/get-profile';

export const ArticleMeta = ({ slug }: { slug: string }) => {
  const { addNotification } = useNotifications();
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const articleQuery = useArticle({ slug });
  const article = articleQuery.data?.article;

  // NOTE: have to explicit get author profile instead of using the one returned
  // with the article because when we toggle follow/unfollow author profile in
  // route '/profile/:username', there is no way to mark data of this article
  // as staled so that react-query know to refetch new article data to get new
  // author profile data
  const authorProfileQuery = useProfile({
    username: article?.author.username || '',
    queryConfig: {
      // only enable when article's author's username is loaded
      enabled: !!article?.author.username,
    },
  });
  const authorProfile = authorProfileQuery.data?.profile;

  const deleteFavoriteMutation = useDeleteFavoriteOptions({
    slug,
    mutationConfig: {
      onSuccess: () => {
        addNotification({ type: 'success', title: 'Article Unfavorited' });
      },
    },
  });

  const createFavoriteMutation = useCreateFavoriteOptions({
    slug,
    mutationConfig: {
      onSuccess: () => {
        addNotification({ type: 'success', title: 'Article Favorited' });
      },
    },
  });

  if (articleQuery.isLoading) {
    return <div className="article-meta">Loading...</div>;
  }

  if (!article) {
    return <div className="article-meta">Error occurs please try again</div>;
  }

  if (authorProfileQuery.isLoading) {
    return <div className="article-meta">Loading...</div>;
  }

  if (!authorProfile) {
    return <div className="article-meta">Error occurs please try again</div>;
  }

  return (
    <div className="article-meta">
      <Link to={`/profile/${authorProfile.username}`}>
        <img src={authorProfile.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${authorProfile.username}`} className="author">
          {authorProfile.username}
        </Link>
        <span className="date">
          {article?.createdAt ? formatDate(Date.parse(article?.createdAt)) : ''}
        </span>
      </div>
      <button
        onClick={() => {
          if (!user.data) {
            navigate(paths.login.getHref(location.pathname));
            return;
          }
        }}
        className={
          'btn btn-sm ' +
          (article.author.following ? 'btn-secondary' : 'btn-outline-secondary')
        }
      >
        <i className="ion-plus-round"></i>
        &nbsp; {authorProfile.following ? 'Unfollow' : 'Follow'}{' '}
        {authorProfile.username}{' '}
        <span className="counter">({authorProfile.followersCount || 0})</span>
      </button>
      &nbsp;&nbsp;
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
            deleteFavoriteMutation.mutate({ slug });
          } else {
            createFavoriteMutation.mutate({ slug });
          }
        }}
        className={
          'btn btn-sm ' +
          (article.favorited ? 'btn-primary' : 'btn-outline-primary')
        }
      >
        <i className="ion-heart"></i>
        &nbsp; {article?.favorited ? 'Unfavorite' : 'Favorite'} Article{' '}
        <span className="counter">({article?.favoritesCount || 0})</span>
      </button>
      &nbsp;&nbsp;
      <Authorization
        policyCheck={POLICIES['article:edit'](user.data?.user, article)}
      >
        <button className="btn btn-sm btn-outline-secondary">
          <i className="ion-edit"></i> Edit Article
        </button>
      </Authorization>
      &nbsp;&nbsp;
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
