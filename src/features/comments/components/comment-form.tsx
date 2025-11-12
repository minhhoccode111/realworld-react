import { useUser } from '@/lib/auth';

type CommentFormProps = {
  slug: string;
};

export const CommentForm = ({ slug }: CommentFormProps) => {
  const user = useUser();
  console.log('comment-form: ', slug);

  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
        ></textarea>
      </div>
      <div className="card-footer">
        <img src={user.data?.user.image} className="comment-author-img" />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  );
};
