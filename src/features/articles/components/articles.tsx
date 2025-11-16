import { Link } from '@/components/ui/link/link';
import { TagsList } from '@/features/tags/components/tags-list';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

export const Articles = () => {
  // TODO: extract articles-list (and article-pagination?)
  const [isFeed, setIsFeed] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTag = searchParams.get('tag');

  return (
    <div className="row">
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            <li className="nav-item">
              <button
                onClick={() => {
                  setSearchParams({});
                  setIsFeed(true);
                }}
                className={'nav-link ' + (!currentTag && isFeed && 'active')}
              >
                Your Feed
              </button>
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

        <div className="article-preview">
          <div className="article-meta">
            <a href="/profile/eric-simons">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href="/profile/eric-simons" className="author">
                Eric Simons
              </a>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
              <i className="ion-heart"></i> 29
            </button>
          </div>
          <Link
            to="/article/how-to-build-webapps-that-scale"
            className="preview-link"
          >
            <h1>How to build webapps that scale</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
            <ul className="tag-list">
              <li className="tag-default tag-pill tag-outline">realworld</li>
              <li className="tag-default tag-pill tag-outline">
                implementations
              </li>
            </ul>
          </Link>
        </div>

        <div className="article-preview">
          <div className="article-meta">
            <a href="/profile/albert-pai">
              <img src="http://i.imgur.com/N4VcUeJ.jpg" />
            </a>
            <div className="info">
              <a href="/profile/albert-pai" className="author">
                Albert Pai
              </a>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-outline-primary btn-sm pull-xs-right">
              <i className="ion-heart"></i> 32
            </button>
          </div>
          <Link to="/article/slug" className="preview-link">
            <h1>
              The song you won't ever stop singing. No matter how hard you try.
            </h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
            <ul className="tag-list">
              <li className="tag-default tag-pill tag-outline">realworld</li>
              <li className="tag-default tag-pill tag-outline">
                implementations
              </li>
            </ul>
          </Link>
        </div>

        <ul className="pagination">
          <li className="page-item active">
            <a className="page-link" href="">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="">
              2
            </a>
          </li>
        </ul>
      </div>

      <TagsList />
    </div>
  );
};
