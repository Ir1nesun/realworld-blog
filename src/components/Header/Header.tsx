import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { useAuth } from '../../context/authContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(user ? '/articles' : '/sign-in');
  };

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <header className="header">
      <h1 className="header__logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        Realworld Blog
      </h1>

      <nav className="header_nav">
        {user ? (
          <>
            <Link to={user ? '/new-article' : '/sign-in'} className="header__button">
              Create Article
            </Link>
            <Link to="/profile" className="header__user">
              {user.username}
            </Link>
            <img src="/images/avatar.png" alt="avatar" className="header__avatar" />
            <button onClick={handleLogout} className="header__logout">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="header__user">
              Sign In
            </Link>
            <Link to="/sign-up" className="header__button">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
