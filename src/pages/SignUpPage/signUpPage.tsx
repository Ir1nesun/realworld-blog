import { useForm } from 'react-hook-form';
import { registerUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signUpPage.css';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const { username, email, password } = data;
      const response = await registerUser({ username, email, password });

      localStorage.setItem('userId', response.user.id.toString());
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);

      navigate('/articles');
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setServerErrors(error.response.data.errors);
      } else {
        alert('Registration error');
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>Create new account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="signup-field">
          <label>Username</label>
          <input
            className={errors.username ? 'invalid' : ''}
            placeholder="Username"
            {...register('username', { required: true })}
          />
          {errors.username && <p>Username is required</p>}
          {serverErrors.username && <p>{serverErrors.username.join(', ')}</p>}
        </div>

        <div className="signup-field">
          <label>Email address</label>
          <input
            className={errors.email ? 'invalid' : ''}
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email && <p>Email is required</p>}
          {serverErrors.email && <p>{serverErrors.email.join(', ')}</p>}
        </div>

        <div className="signup-field">
          <label>Password</label>
          <input
            type="password"
            className={errors.password ? 'invalid' : ''}
            placeholder="Password"
            {...register('password', {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password?.type === 'required' && <p>Password is required</p>}
          {errors.password?.type === 'minLength' && (
            <p>Your password needs to be at least 6 characters.</p>
          )}
        </div>

        <div className="signup-field">
          <label>Repeat Password</label>
          <input
            type="password"
            className={errors.repeatPassword ? 'invalid' : ''}
            placeholder="Repeat Password"
            {...register('repeatPassword', {
              required: true,
              validate: val => val === watch('password'),
            })}
          />
          {errors.repeatPassword && <p>Passwords must match</p>}
        </div>

        <div className="signup-divider" />

        <label className="signup-checkbox">
          <input type="checkbox" {...register('agree', { required: true })} />I agree to the
          processing of my personal information
        </label>
        {errors.agree && <p style={{ color: '#ff4d4f', fontSize: '12px' }}>Confirm your consent</p>}

        <button type="submit" className="signup-button">
          Create
        </button>

        <div className="form-footer">
          Already have an account?{' '}
          <Link to="/sign-in" className="form-footer__link">
            Sign In.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
