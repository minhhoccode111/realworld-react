import { useInfiniteTags } from '../api/get-tags';

export const TagsList = () => {
  const tagsQuery = useInfiniteTags({});

  if (tagsQuery.isLoading) {
    return (
      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>
          <div className="tag-list">
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const tags = tagsQuery.data?.pages.flatMap((page) => page.tags);
  if (!tags || !tags?.length) {
    return (
      <div className="col-md-3">
        <div className="sidebar">
          <p>Popular Tags</p>
          <div className="tag-list">
            <span>No Tags Found</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {tags.map((t) => (
            <a key={t} href="" className="tag-pill tag-default">
              {t}
            </a>
          ))}
        </div>

        {tagsQuery.hasNextPage && (
          <button onClick={() => tagsQuery.fetchNextPage()}>
            {tagsQuery.isFetchingNextPage ? 'Loading...' : 'More...'}
          </button>
        )}
      </div>
    </div>
  );
};
