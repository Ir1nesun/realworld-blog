import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchArticleBySlug, updateArticle } from '../../api/articlesApi';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

type ArticleParams = {
  slug: string;
};

const EditArticlePage = () => {
  const { slug } = useParams<ArticleParams>();
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

  const mutation = useMutation({
    mutationFn: (updatedData: any) => updateArticle(slug!, updatedData),
    onSuccess: () => {
      navigate(`/articles/${slug}`);
    },
  });

  if (isLoading) return <p>Загрузка статьи...</p>;
  if (error) return <p>Ошибка при загрузке статьи</p>;
  if (!article) return null;

  return (
    <ArticleForm
      initialData={{
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      }}
      onSubmit={updatedData => {
        const fullData = {
          ...article,
          ...updatedData,
        };
        mutation.mutate(fullData);
      }}
      buttonText="Send"
    />
  );
};

export default EditArticlePage;
