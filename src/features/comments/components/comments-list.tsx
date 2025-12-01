import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar/avatar';
import { Button } from '@/components/ui/button/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card/card';
import { Link } from '@/components/ui/link/link';
import { MDPreview } from '@/components/ui/md-preview/md-preview';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';
import { Authorization, POLICIES } from '@/lib/authorization';
import { formatDate } from '@/utils/format';

import { useInfiniteComments } from '../api/get-comments';

import { DeleteComment } from './delete-comment';
import { getUserInitials } from '@/utils/user-initials';

type CommentsListProps = {
  slug: string;
};

export const CommentsList = ({ slug }: CommentsListProps) => {
  const user = useUser();

  const commentsQuery = useInfiniteComments({ slug, limit: 5 });

  if (commentsQuery.isLoading) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">Loading comments...</p>
      </div>
    );
  }

  const comments = commentsQuery.data?.pages.flatMap((page) => page.comments);

  if (!comments || !comments?.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-400">
          No comments yet. Be the first to comment!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((c, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <MDPreview value={c.body} />
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t bg-gray-50 px-6 py-3">
            <div className="flex items-center gap-3">
              <Link to={paths.profile.root.getHref(c.author.username)}>
                <Avatar className="size-6">
                  <AvatarImage src={c.author.image} alt={c.author.username} />
                  <AvatarFallback>
                    {getUserInitials(c.author.username)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Link
                to={paths.profile.root.getHref(c.author.username)}
                className="text-sm font-medium text-realworld hover:text-realworld-hover hover:underline"
              >
                {c.author.username}
              </Link>
              <span className="text-xs text-gray-400">
                {formatDate(Date.parse(c.createdAt))}
              </span>
            </div>

            {user.data && (
              <Authorization
                policyCheck={POLICIES['comment:delete'](user.data.user, c)}
              >
                <DeleteComment slug={slug} commentId={c.id} />
              </Authorization>
            )}
          </CardFooter>
        </Card>
      ))}

      {commentsQuery.hasNextPage && (
        <div className="flex items-center justify-center py-4">
          <Button
            size="sm"
            variant="realworld"
            className=""
            onClick={() => commentsQuery.fetchNextPage()}
            disabled={commentsQuery.isFetchingNextPage}
            isLoading={commentsQuery.isFetchingNextPage}
          >
            Load More Comments
          </Button>
        </div>
      )}
    </div>
  );
};
