import { useQueryClient } from '@tanstack/react-query';
import { Edit, Heart, Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar';
import { Button } from '@/components/ui/button/button';
import { Link } from '@/components/ui/link/link';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { useFollowProfile } from '@/features/profiles/api/follow-profile';
import {
  getProfileQueryOptions,
  useProfile,
} from '@/features/profiles/api/get-profile';
import { useUnfollowProfile } from '@/features/profiles/api/unfollow-profile';
import { useUser } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/format';
import { getUserInitials } from '@/utils/user-initials';

import { useFavoriteArticle } from '../api/favorite-article';
import { useArticle } from '../api/get-article';
import { useUnfavoriteArticle } from '../api/unfavorite-article';

import { DeleteArticle } from './delete-article';

export const ArticleMeta = ({ slug }: { slug: string }) => {
  const { addNotification } = useNotifications();
  const user = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const articleQuery = useArticle({ slug });
  const article = articleQuery.data?.article;

  if (articleQuery.isLoading || user.isLoading) {
    return <div className="text-xs text-gray-500">Loading...</div>;
  }

  if (!article) {
    return (
      <div className="text-xs text-red-500">Error occurs please try again.</div>
    );
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

  const isFollowLoading =
    followProfileMutation.isPending || unfollowProfileMutation.isPending;
  const isFavoriteLoading =
    createFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        onMouseEnter={() => {
          queryClient.prefetchQuery(
            getProfileQueryOptions({ username: authorProfile.username }),
          );
        }}
        to={paths.profile.root.getHref(authorProfile.username)}
      >
        <Avatar>
          <AvatarImage src={authorProfile.image} alt={authorProfile.username} />
          <AvatarFallback>
            {getUserInitials(authorProfile.username)}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex flex-col">
        <Link
          onMouseEnter={() => {
            queryClient.prefetchQuery(
              getProfileQueryOptions({ username: authorProfile.username }),
            );
          }}
          to={paths.profile.root.getHref(authorProfile.username)}
          className="font-medium text-realworld hover:text-realworld-hover hover:underline"
        >
          {authorProfile.username}
        </Link>

        <span className="text-xs text-gray-300">
          {article.createdAt ? formatDate(Date.parse(article.createdAt)) : ''}
        </span>
      </div>

      <Button
        size="sm"
        variant="outline"
        disabled={isFollowLoading}
        onClick={() => {
          if (!user.data) {
            navigate(paths.login.getHref(location.pathname));
            return;
          }
          if (authorProfile.following) {
            unfollowProfileMutation.mutate({
              username: authorProfile.username,
            });
          } else {
            followProfileMutation.mutate({ username: authorProfile.username });
          }
        }}
        className={cn(
          'border-gray-400 text-sm rounded-sm',
          authorProfile.following
            ? 'bg-gray-400 text-realworld-foreground hover:text-gray-400 hover:bg-transparent'
            : 'bg-transparent text-gray-400 hover:text-realworld-foreground hover:bg-gray-400',
        )}
        icon={<Plus className="size-4 fill-current" />}
        isLoading={isFollowLoading}
      >
        {authorProfile.following
          ? `Unfollow ${authorProfile.username} (${authorProfile.followersCount || 0})`
          : `Follow ${authorProfile.username} (${authorProfile.followersCount || 0})`}
      </Button>

      <Button
        size="sm"
        variant="outline"
        disabled={isFavoriteLoading}
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
        className={cn(
          'border-realworld text-sm rounded-sm',
          article.favorited
            ? 'bg-realworld text-realworld-foreground hover:text-realworld hover:bg-transparent'
            : 'bg-transparent text-realworld hover:bg-realworld hover:text-realworld-foreground',
        )}
        icon={<Heart className="size-4 fill-current" />}
        isLoading={isFavoriteLoading}
      >
        {article.favorited
          ? `Unfavorite Article (${article.favoritesCount || 0})`
          : `Favorite Article (${article.favoritesCount || 0})`}
      </Button>

      {user.data && (
        <>
          <Authorization
            policyCheck={POLICIES['article:edit'](user.data.user, article)}
          >
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(paths.editor.update.getHref(slug))}
              className="rounded-sm border-gray-400 bg-transparent text-sm text-gray-400 hover:bg-gray-400 hover:text-realworld-foreground"
              icon={<Edit className="size-4" />}
            >
              Edit Article
            </Button>
          </Authorization>

          <Authorization
            policyCheck={POLICIES['article:delete'](user.data.user, article)}
          >
            <DeleteArticle slug={slug} />
          </Authorization>
        </>
      )}
    </div>
  );
};
