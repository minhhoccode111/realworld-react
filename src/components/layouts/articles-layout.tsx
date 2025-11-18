import { useState } from 'react';
import { useSearchParams } from 'react-router';

import { ArticlesList } from '@/features/articles/components/articles-list';
import { useUser } from '@/lib/auth';

export const ArticlesLayout = () => {
  const user = useUser();

  const [isFeed, setIsFeed] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTag = searchParams.get('tag');

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            {!user.isLoading && user.data && (
              <button
                onClick={() => {
                  setSearchParams({});
                  setIsFeed(true);
                }}
                className={'nav-link ' + (!currentTag && isFeed && 'active')}
              >
                Your Feed
              </button>
            )}
          </li>
          <li className="nav-item">
            <button
              onClick={() => {
                setSearchParams({});
                setIsFeed(false);
              }}
              className={'nav-link ' + (!currentTag && !isFeed && 'active')}
            >
              Global Feed
            </button>
          </li>
          {currentTag && (
            <li className="nav-item">
              <button className="nav-link active">#{currentTag}</button>
            </li>
          )}
        </ul>
      </div>

      <ArticlesList isFeed={isFeed} />
    </div>
  );
};
