import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { ArticlesList } from '@/features/articles/components/articles-list';
import { useUser } from '@/lib/auth';
import { cn } from '@/utils/cn';

export const ArticlesLayout = () => {
  const user = useUser();
  const [isFeed, setIsFeed] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTag = searchParams.get('tag');

  useEffect(() => {
    if (currentTag) setIsFeed(false);
  }, [currentTag]);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <ul className="flex items-center gap-1">
          {!user.isLoading && user.data && (
            <li>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchParams({});
                  setIsFeed(true);
                }}
                className={cn(
                  'rounded-none border-b-2 -mb-px px-4 h-auto py-3 bg-transparent hover:bg-transparent',
                  !currentTag && isFeed
                    ? 'text-realworld border-realworld hover:text-realworld'
                    : 'text-gray-400 border-transparent hover:text-gray-700 hover:border-gray-300',
                )}
              >
                Your Feed
              </Button>
            </li>
          )}
          <li>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchParams({});
                setIsFeed(false);
              }}
              className={cn(
                'rounded-none border-b-2 -mb-px px-4 h-auto py-3 bg-transparent hover:bg-transparent',
                !currentTag && !isFeed
                  ? 'text-realworld border-realworld hover:text-realworld'
                  : 'text-gray-400 border-transparent hover:text-gray-700 hover:border-gray-300',
              )}
            >
              Global Feed
            </Button>
          </li>
          {currentTag && (
            <li>
              <Button
                variant="ghost"
                className={cn(
                  'rounded-none border-b-2 -mb-px px-4 h-auto py-3 bg-transparent hover:bg-transparent',
                  'text-realworld border-realworld hover:text-realworld',
                )}
              >
                #{currentTag}
              </Button>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-6">
        <ArticlesList isFeed={isFeed} />
      </div>
    </div>
  );
};
