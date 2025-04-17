import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',
});

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await API.post('/register', userData);

  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await API.post('/login', data);
  return response.data;
};

export const updateProfile = async (userData: {
  username: string;
  email: string;
  password?: string;
  image?: string;
}) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (!userId) throw new Error('Пользователь не авторизован');

  const response = await API.patch(`/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { user: response.data };
};
