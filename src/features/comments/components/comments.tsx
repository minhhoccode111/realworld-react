import { CommentsList } from './comments-list';
import { CreateComment } from './create-comment';

export const Comments = ({ slug }: { slug: string }) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <CreateComment slug={slug} />

        <CommentsList slug={slug} />
      </div>
    </div>
  );
};
