import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

export const fetchArticles = async (page = 1) => {
  const limit = 5;
  const response = await API.get(`/articles?_limit=${limit}&_page=${page}`);

  const totalCountHeader = response.headers['x-total-count'];
  const totalCount = totalCountHeader ? Number(totalCountHeader) : 0;

  return {
    articles: response.data,
    totalCount,
  };
};

export const fetchArticleBySlug = async (slug: string) => {
  const response = await API.get(`/articles?slug=${slug}`);
  if (response.data.length === 0) {
    throw new Error('Статья не найдена');
  }
  return response.data[0];
};

export const updateArticle = async (slug: string, updatedData: any) => {
  const getRes = await API.get(`/articles?slug=${slug}`);
  const article = getRes.data[0];

  if (!article) {
    throw new Error('Статья не найдена');
  }

  const updatedArticle = {
    ...article,
    ...updatedData,
    slug: generateSlug(updatedData.title),
  };

  const putRes = await API.put(`/articles/${article.id}`, updatedArticle);
  return putRes.data;
};

export const deleteArticle = async (slug: string) => {
  const res = await API.get(`/articles?slug=${slug}`);
  const article = res.data[0];

  if (!article) {
    throw new Error('Статья не найдена');
  }

  await API.delete(`/articles/${article.id}`);
};

export const createArticle = async (
  articleData: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  },
  author: { username: string; image: string }
) => {
  const response = await API.post('/articles', {
    ...articleData,
    author,
    createdAt: new Date().toISOString(),
    favoritesCount: 0,
    likedBy: [],
    slug: articleData.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, ''),
  });

  return response.data;
};
