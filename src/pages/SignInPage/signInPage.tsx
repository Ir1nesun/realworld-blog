import { useForm } from 'react-hook-form';
import { loginUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signInPage.css';

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;
      const response = await loginUser({ email, password });

      localStorage.setItem('userId', response.user.id.toString());
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      navigate('/articles');
    } catch (error: any) {
      if (error.response?.status === 422) {
        setServerError('Invalid email or password');
      } else {
        setServerError('Login error');
      }
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signin-field">
          <label>Email address</label>
          <input
            placeholder="Email address"
            className={errors.email ? 'invalid' : ''}
            {...register('email', { required: true })}
          />
          {errors.email && <p>Email is required</p>}
        </div>

        <div className="signin-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className={errors.password ? 'invalid' : ''}
            {...register('password', { required: true })}
          />
          {errors.password && <p>Password is required</p>}
        </div>

        {serverError && <p className="error">{serverError}</p>}

        <button type="submit" className="signin-button">
          Login
        </button>

        <div className="form-footer">
          Don’t have an account?{' '}
          <Link to="/sign-up" className="form-footer__link">
            Sign Up.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
