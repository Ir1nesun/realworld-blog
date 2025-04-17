import ArticleHeader from '../ArticleHeader/ArticleHeader';
import './articleCard.css';
import '../ArticleHeader/articleHeader.css';

interface Author {
  username: string;
  image: string;
}

interface Article {
  slug: string;
  title: string;
  description: string;
  favoritesCount: number;
  createdAt: string;
  author: Author;
  tagList?: string[];
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div className="article-card">
      <ArticleHeader
        title={article.title}
        description={article.description}
        favoritesCount={article.favoritesCount}
        createdAt={article.createdAt}
        author={article.author}
        tagList={article.tagList || []}
        slug={article.slug}
      />
    </div>
  );
};

export default ArticleCard;
