import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import EditArticlePage from './pages/EditArticlePage/EditArticlePage';
import Header from './components/Header/Header';
import SignUpPage from './pages/SignUpPage/signUpPage';
import SignInPage from './pages/SignInPage/signInPage';
import { useAuth } from './context/authContext';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NewArticlePage from './pages/NewArticlePage/NewArticlePage';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={user ? '/articles' : '/sign-in'} />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />

        <Route
          path="/articles"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:slug"
          element={
            <PrivateRoute>
              <ArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <PrivateRoute>
              <EditArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <NewArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
