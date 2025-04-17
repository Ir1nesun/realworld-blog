import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchArticleBySlug, deleteArticle } from '../../api/articlesApi';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import './articlePage.css';
import '../../components/ArticleHeader/articleHeader.css';
import ArticleHeader from '../../components/ArticleHeader/ArticleHeader';

const ArticlePage = () => {
  const { slug } = useParams();
  const currentUser = { username: 'run_guru' };
  const navigate = useNavigate();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchArticleBySlug(slug!),
    enabled: !!slug,
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => deleteArticle(slug),
    onSuccess: () => {
      navigate(`/articles`);
    },
  });

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Error loading the article</p>;
  if (!article) return null;

  return (
    <div className="article-page">
      <ArticleHeader
        title={article.title}
        description={article.description}
        favoritesCount={article.favoritesCount}
        tagList={article.tagList}
        author={article.author}
        createdAt={article.createdAt}
        showControls={article.author.username === currentUser.username}
        onEdit={() => navigate(`/articles/${article.slug}/edit`)}
        onDelete={() => deleteMutation.mutate(article.slug)}
        isPage
      />
      <div className="article-page__body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ArticlePage;
