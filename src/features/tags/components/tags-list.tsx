import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { Badge } from '@/components/ui/badge/badge';
import { Button } from '@/components/ui/button';

import { useInfiniteTags } from '../api/get-tags';

export const TagsList = () => {
  const [, setSearchParams] = useSearchParams();

  const tagsQuery = useInfiniteTags({});

  if (tagsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const tags = tagsQuery.data?.pages.flatMap((page) => page.tags);

  if (!tags || !tags?.length) {
    return (
      <p className="py-8 text-center text-sm text-gray-500">No Tags Found</p>
    );
  }

  return (
    <>
      <div className="mb-4 flex flex-1 flex-wrap gap-0.5 overflow-y-auto">
        {tags.map((t) => (
          <Badge
            key={t}
            variant="default"
            className="cursor-pointer break-all rounded-xl bg-gray-500"
            onClick={() => setSearchParams({ tag: t })}
          >
            {t}
          </Badge>
        ))}
      </div>

      {tagsQuery.hasNextPage && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs text-gray-500 hover:bg-transparent hover:text-realworld"
          onClick={() => tagsQuery.fetchNextPage()}
          disabled={tagsQuery.isFetchingNextPage}
          isLoading={tagsQuery.isFetchingNextPage}
        >
          Load More Tags
        </Button>
      )}
    </>
  );
};
