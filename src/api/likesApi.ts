import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getLikedSlugs = (): string[] => {
  return JSON.parse(localStorage.getItem('likedSlugs') || '[]');
};

export const isArticleLiked = (slug: string): boolean => {
  const liked = getLikedSlugs();
  return liked.includes(slug);
};

export const toggleLike = async (
  slug: string,
  user: string,
  isCurrentlyLiked: boolean
): Promise<number> => {
  const res = await API.get(`/articles?slug=${slug}`);
  const article = res.data[0];

  if (!article) throw new Error('Статья не найдена');

  const likedBy = new Set(article.likedBy || []);
  isCurrentlyLiked ? likedBy.delete(user) : likedBy.add(user);

  const likedSlugs = new Set(getLikedSlugs());
  isCurrentlyLiked ? likedSlugs.delete(slug) : likedSlugs.add(slug);
  localStorage.setItem('likedSlugs', JSON.stringify([...likedSlugs]));

  const updated = {
    ...article,
    favoritesCount: likedBy.size,
    likedBy: Array.from(likedBy),
  };

  await API.put(`/articles/${article.id}`, updated);
  return likedBy.size;
};
