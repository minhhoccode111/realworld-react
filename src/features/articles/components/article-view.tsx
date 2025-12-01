import { Badge } from '@/components/ui/badge/badge';
import { MDPreview } from '@/components/ui/md-preview/md-preview';

import { useArticle } from '../api/get-article';

export const ArticleView = ({ slug }: { slug: string }) => {
  const articleQuery = useArticle({ slug });

  if (articleQuery.isLoading) {
    return (
      <div className="py-3">
        <span className="text-gray-500">Loading article...</span>
      </div>
    );
  }

  if (!articleQuery.data) {
    return (
      <div className="py-3">
        <p className="text-red-500">Error occurred. Please try again.</p>
      </div>
    );
  }

  const article = articleQuery.data.article;

  return (
    <div className="space-y-4">
      <div className="">
        <MDPreview value={article.description} />
      </div>

      <div className="">
        <MDPreview value={article.body} />
      </div>

      {article.tagList && !!article.tagList.length && (
        <div className="flex flex-wrap gap-1">
          {article.tagList.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="break-all rounded-xl border-gray-300 text-xs text-gray-500 hover:bg-gray-50"
            >
              {t}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
