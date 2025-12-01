import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar';
import { Badge } from '@/components/ui/badge/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link/link';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { getInfiniteCommentsQueryOptions } from '@/features/comments/api/get-comments';
import { getProfileQueryOptions } from '@/features/profiles/api/get-profile';
import { useUser } from '@/lib/auth';
import { ArticlePreview as ArticlePreviewType } from '@/types/api';
import { cn } from '@/utils/cn';
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

  const getUserInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  const prefetchAuthor = () => {
    queryClient.prefetchQuery(
      getProfileQueryOptions({ username: article.author.username }),
    );
    queryClient.prefetchQuery(
      getArticlesQueryOptions({
        author: article.author.username,
      }),
    );
  };

  const prefetchArticle = () => {
    queryClient.prefetchQuery(
      getProfileQueryOptions({ username: article.author.username }),
    );
    queryClient.prefetchQuery(getArticleQueryOptions({ slug: article.slug }));
    queryClient.prefetchInfiniteQuery(
      getInfiniteCommentsQueryOptions({ slug: article.slug, limit: 5 }),
    );
  };

  const isFavoriteLoading =
    createFavoriteMutation.isPending || deleteFavoriteMutation.isPending;

  return (
    <div className="border-t border-gray-200 py-6 first:border-t-0">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link
            onMouseEnter={prefetchAuthor}
            to={paths.profile.root.getHref(article.author.username)}
          >
            <Avatar className="size-8">
              <AvatarImage
                src={article.author.image}
                alt={article.author.username}
              />
              <AvatarFallback>
                {getUserInitials(article.author.username)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link
              onMouseEnter={prefetchAuthor}
              to={paths.profile.root.getHref(article.author.username)}
              className="text-sm font-medium text-realworld transition-colors hover:text-realworld-hover"
            >
              {article.author.username}
            </Link>
            <span className="text-xs text-gray-400">
              {formatDate(Date.parse(article.createdAt))}
            </span>
          </div>
        </div>
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
              deleteFavoriteMutation.mutate({ slug: article.slug });
            } else {
              createFavoriteMutation.mutate({ slug: article.slug });
            }
          }}
          className={cn(
            'border-realworld text-sm rounded-sm',
            article.favorited
              ? 'bg-realworld text-realworld-foreground hover:text-realworld hover:bg-transparent'
              : 'bg-transparent text-realworld hover:bg-realworld hover:text-realworld-foreground',
          )}
          isLoading={isFavoriteLoading}
          icon={<Heart className="size-4 fill-current" />}
        >
          {article?.favoritesCount || 0}
        </Button>
      </div>
      <Link
        onMouseEnter={prefetchArticle}
        to={paths.article.read.getHref(article.slug)}
        className="group block"
      >
        <h2 className="mb-2 text-xl font-semibold text-gray-700">
          {article.title}
        </h2>
        <p className="mb-3 line-clamp-2 text-sm text-gray-400">
          {article.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="whitespace-nowrap text-xs text-gray-400 transition-colors group-hover:text-realworld">
            Read more...
          </span>
          {article.tagList && !!article.tagList.length && (
            <div className="flex flex-wrap gap-1">
              {article.tagList.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="break-all rounded-xl border-gray-300 text-xs text-gray-500 hover:bg-gray-50"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
