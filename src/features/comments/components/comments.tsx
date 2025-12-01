import { CommentsList } from './comments-list';
import { CreateCommentForm } from './create-comment-form';

export const Comments = ({ slug }: { slug: string }) => {
  return (
    <div className="mx-auto max-w-3xl">
      <CreateCommentForm slug={slug} />

      <CommentsList slug={slug} />
    </div>
  );
};
