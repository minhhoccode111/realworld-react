import { MDPreview } from '@/components/ui/md-preview/md-preview';

import { useArticle } from '../api/get-article';

export const ArticleView = ({ slug }: { slug: string }) => {
  const articleQuery = useArticle({ slug });
  if (articleQuery.isLoading) {
    return (
      <div className="row article-content">
        <div className="col-md-12">Loading...</div>
      </div>
    );
  }

  const article = articleQuery.data?.article;
  if (!article) {
    return (
      <div className="row article-content">
        <div className="col-md-12">Error occurs please try again</div>
      </div>
    );
  }

  return (
    <div className="row article-content">
      <div className="col-md-12">
        <div>
          <MDPreview value={article?.description || ''} />
        </div>

        <MDPreview value={article?.body || ''} />

        <ul className="tag-list">
          {article?.tagList.map((v) => (
            <li key={v} className="tag-default tag-pill tag-outline">
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
