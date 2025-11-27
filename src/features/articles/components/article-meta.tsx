import { useLocation, useNavigate } from 'react-router';

import { Link } from '@/components/ui/link/link';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useFollowProfile } from '@/features/profiles/api/follow-profile';
import { useProfile } from '@/features/profiles/api/get-profile';
import { useUnfollowProfile } from '@/features/profiles/api/unfollow-profile';
import { useUser } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { formatDate } from '@/utils/format';

import { useFavoriteArticle } from '../api/favorite-article';
import { useArticle } from '../api/get-article';
import { useUnfavoriteArticle } from '../api/unfavorite-article';

import { DeleteArticle } from './delete-article';

export const ArticleMeta = ({ slug }: { slug: string }) => {
  const { addNotification } = useNotifications();
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const articleQuery = useArticle({ slug });
  const article = articleQuery.data?.article;

  if (articleQuery.isLoading || user.isLoading) {
    return <div className="article-meta">Loading...</div>;
  }

  if (!article) {
    return <div className="article-meta">Error occurs please try again.</div>;
  }

  // NOTE: have to explicit get author profile instead of using the one returned
  // with the article because when we toggle follow/unfollow author profile in
  // route '/profile/:username', there is no way to mark data of this article
  // as staled so that react-query know to refetch new article data to get new
  // author profile data
  const authorProfileQuery = useProfile({
    username: article.author.username,
    queryConfig: { enabled: !!article.author.username },
  });
  const authorProfile = authorProfileQuery.data?.profile || article.author;

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

  const followProfileMutation = useFollowProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: `Profile Followed`,
        });
      },
    },
  });

  const unfollowProfileMutation = useUnfollowProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: `Profile Unfollowed`,
        });
      },
    },
  });

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
        disabled={
          followProfileMutation.isPending || unfollowProfileMutation.isPending
        }
        onClick={() => {
          if (!user.data) {
            navigate(paths.login.getHref(location.pathname));
            return;
          }
          if (authorProfile.following) {
            unfollowProfileMutation.mutate(
              { username: authorProfile }.username,
            );
          } else {
            followProfileMutation.mutate({ username: authorProfile }.username);
          }
        }}
        className={
          'btn btn-sm ' +
          (authorProfile.following ? 'btn-secondary' : 'btn-outline-secondary')
        }
      >
        <i className="ion-plus-round"></i> &nbsp;{' '}
        {followProfileMutation.isPending ||
        unfollowProfileMutation.isPending ? (
          'Loading...'
        ) : (
          <>
            {authorProfile.following ? 'Unfollow' : 'Follow'}{' '}
            {authorProfile.username}{' '}
            <span className="counter">
              ({authorProfile.followersCount || 0})
            </span>
          </>
        )}
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
        <i className="ion-heart"></i> &nbsp;
        {createFavoriteMutation.isPending ||
        deleteFavoriteMutation.isPending ? (
          'Loading...'
        ) : (
          <>
            {article?.favorited ? 'Unfavorite' : 'Favorite'} Article{' '}
            <span className="counter">({article?.favoritesCount || 0})</span>
          </>
        )}
      </button>
      &nbsp;&nbsp;
      <Authorization
        policyCheck={POLICIES['article:edit'](user.data?.user, article)}
      >
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => navigate(paths.editor.update.getHref(slug))}
        >
          <i className="ion-edit"></i> Edit Article
        </button>
      </Authorization>
      &nbsp;&nbsp;
      <Authorization
        policyCheck={POLICIES['article:delete'](user.data?.user, article)}
      >
        <DeleteArticle slug={slug} />
      </Authorization>
    </div>
  );
};
