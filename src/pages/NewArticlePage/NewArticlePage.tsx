import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../../api/articlesApi';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

interface ArticleFormData {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

const NewArticlePage = () => {
  const navigate = useNavigate();

  const currentUser = {
    username: 'run_guru',
    image: '/images/avatar.png',
  };

  const createMutation = useMutation({
    mutationFn: (data: ArticleFormData) => createArticle(data, currentUser),
    onSuccess: article => {
      navigate(`/articles/${article.slug}`);
    },
  });

  return (
    <ArticleForm
      initialData={{
        title: '',
        description: '',
        body: '',
        tagList: [''],
      }}
      onSubmit={(formData: ArticleFormData) => createMutation.mutate(formData)}
      buttonText="Send"
    />
  );
};

export default NewArticlePage;
