import { MDPreview } from '@/components/ui/md-preview/md-preview';
import { Authorization, POLICIES } from '@/lib/authorization';
import { useInfiniteComments } from '../api/get-comments';
import { useUser } from '@/lib/auth';
import { formatDate } from '@/utils/format';

type CommentsListProps = {
  slug: string;
};

export const CommentsList = ({ slug }: CommentsListProps) => {
  const user = useUser();

  const commentsQuery = useInfiniteComments({ slug });

  if (commentsQuery.isLoading) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  const comments = commentsQuery.data?.pages.flatMap((page) => page.comments);

  if (!comments?.length)
    return (
      <div>
        <h4>No Comments Found</h4>
      </div>
    );

  return (
    <div>
      {comments?.map((c, i) => (
        <div key={i} className="card">
          <div className="card-block">
            <div className="card-text">
              <MDPreview value={c.body} />
            </div>
          </div>
          <div className="card-footer">
            <a
              href={`/profile/${c.author.username}`}
              className="comment-author"
            >
              <img src={c.author.image} className="comment-author-img" />
            </a>
            &nbsp;
            <a
              href={`/profile/${c.author.username}`}
              className="comment-author"
            >
              {c.author.username}
            </a>
            <span className="date-posted">
              {formatDate(Date.parse(c.createdAt))}
            </span>
            <Authorization
              policyCheck={POLICIES['comment:delete'](user.data?.user, c)}
            >
              <span className="mod-options">
                <i className="ion-trash-a"></i>
              </span>
            </Authorization>
          </div>
        </div>
      ))}
    </div>
  );
};
