import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '../../api/articlesApi';
import { useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import './homePage.css';

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['articles', page],
    queryFn: () => fetchArticles(page),
  });

  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error loading the article</div>;
  if (!data) return null;

  return (
    <>
      <div className="article-list">
        {data.articles.map((article: any) => (
          <ArticleCard key={article.slug || article.id} article={article} />
        ))}
      </div>
      {data.totalCount > 5 && (
        <Pagination currentPage={page} totalCount={data.totalCount} onPageChange={setPage} />
      )}
    </>
  );
};

export default HomePage;
