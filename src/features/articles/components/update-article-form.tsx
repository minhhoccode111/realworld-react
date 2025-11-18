export const UpdateArticleForm = () => {
  return (
    <>
      <p>this is create</p>
      <form>
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's this article about?"
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tags"
            />
            <div className="tag-list">
              <span className="tag-default tag-pill">
                {' '}
                <i className="ion-close-round"></i> tag{' '}
              </span>
            </div>
          </fieldset>

          <ul className="error-messages">
            <li>That title is required</li>
          </ul>

          <button
            className="btn btn-lg pull-xs-right btn-primary"
            type="button"
          >
            Publish Article
          </button>
        </fieldset>
      </form>
    </>
  );
};
