import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './articleHeader.css';
import { Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { isArticleLiked, toggleLike } from '../../api/likesApi';

interface Author {
  username: string;
  image: string;
}

interface ArticleHeaderProps {
  title: string;
  description: string;
  favoritesCount: number;
  createdAt: string;
  author: Author;
  tagList: string[];
  slug?: string;
  isPage?: boolean;
  showControls?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const currentUser = { username: 'run_guru' };

const ArticleHeader = ({
  title,
  description,
  favoritesCount,
  createdAt,
  author,
  tagList,
  slug,
  isPage = false,
  showControls = false,
  onEdit,
  onDelete,
}: ArticleHeaderProps) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(favoritesCount);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    setLiked(isArticleLiked(slug || ''));
    setCount(favoritesCount);
  }, [slug, favoritesCount]);

  const handleLike = async () => {
    if (!slug) return;

    try {
      const newCount = await toggleLike(slug, currentUser.username, liked);
      setLiked(!liked);
      setCount(newCount);
    } catch (error) {
      console.error('Ошибка при лайке:', error);
    }
  };

  return (
    <div className={`article-header ${isPage ? 'article-header--page' : ''}`}>
      <div className="article-header__top-row">
        <div className="article-header__main">
          <div className="article-header__top">
            {slug ? (
              <Link to={`/articles/${slug}`} className="article-header__title">
                {title}
              </Link>
            ) : (
              <h1 className="article-header__title">{title}</h1>
            )}
            <div
              className="article-header__likes"
              onClick={handleLike}
              style={{ cursor: 'pointer' }}
            >
              {liked ? (
                <AiFillHeart size={18} color="red" />
              ) : (
                <AiOutlineHeart size={18} color="#ccc" />
              )}
              <span>{count}</span>
            </div>
          </div>

          {tagList.length > 0 && (
            <div className="article-header__tags">
              {tagList.map(tag => (
                <span
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`article-header__tag ${
                    activeTag === tag ? 'article-header__tag--active' : ''
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="article-header__description">{description}</p>
        </div>

        <div className="article-header__meta">
          <div className="article-header__meta-top">
            <div className="article-header__info">
              <div className="article-header__username">{author?.username}</div>
              <div className="article-header__date">
                {createdAt ? new Date(createdAt).toLocaleDateString() : ''}
              </div>
            </div>
            <img src="/images/avatar.png" alt="avatar" className="article-header__avatar" />
          </div>

          {showControls && (
            <div className="article-header__controls">
              <Popconfirm
                title="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                placement="rightTop"
                onConfirm={onDelete}
              >
                <button className="delete-button">Delete</button>
              </Popconfirm>
              <button className="edit-button" onClick={onEdit}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
