import { useSearchParams } from 'react-router';
import { useInfiniteTags } from '../api/get-tags';

export const TagsList = () => {
  const [, setSearchParams] = useSearchParams();

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
            <button
              onClick={() => setSearchParams({ tag: t })}
              key={t}
              className="tag-pill tag-default"
            >
              {t}
            </button>
          ))}
        </div>

        {tagsQuery.hasNextPage && (
          <button className="text-sm" onClick={() => tagsQuery.fetchNextPage()}>
            {tagsQuery.isFetchingNextPage ? 'Loading...' : 'More...'}
          </button>
        )}
      </div>
    </div>
  );
};
