import { useSearchParams } from 'react-router';

import { TablePagination } from '@/components/ui/table/pagination';
import { LIMIT_DEFAULT } from '@/config/constants';

import { useArticles } from '../api/get-articles';

import { ArticlePreview } from './article-preview';

type ArticlesListProps = {
  isFeed?: boolean;
  author?: string;
  favorited?: string;
};

export const ArticlesList = ({
  isFeed = false,
  author = '',
  favorited = '',
}: ArticlesListProps) => {
  const [searchParams] = useSearchParams();
  const currentPage = +(searchParams.get('page') || 1);

  const filteredSearchParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    if (key !== 'page') {
      filteredSearchParams.append(key, value);
    }
  });
  const queries = filteredSearchParams.toString();

  const articlesQuery = useArticles({
    isFeed,
    author: author || undefined,
    favorited: favorited || undefined,
    tag: searchParams.get('tag') || undefined,
    limit: LIMIT_DEFAULT,
    offset: (currentPage - 1) * LIMIT_DEFAULT,
  });

  if (articlesQuery.isLoading) {
    return <div className="article-preview">Loading...</div>;
  }

  const articles = articlesQuery.data?.articles;

  if (!articlesQuery.data || !articles) {
    return (
      <div className="article-preview">Error occurs please try again.</div>
    );
  }

  if (!articles.length) {
    return <div className="article-preview">No Articles Found</div>;
  }

  return (
    <>
      {articles.map((a) => (
        <ArticlePreview key={a.slug} article={a} />
      ))}

      <TablePagination
        totalPages={Math.floor(
          (articlesQuery.data?.total + LIMIT_DEFAULT - 1) / LIMIT_DEFAULT,
        )}
        currentPage={currentPage}
        rootUrl={''}
        queries={queries}
      />
    </>
  );
};
