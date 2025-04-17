import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../api/authApi';
import './profilePage.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      image: user?.image || '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: updatedUser => {
      setUser(updatedUser.user);
      navigate('/articles');
    },
    onError: err => {
      alert('Error updating the profile');
      console.error(err);
    },
  });

  const onSubmit = (data: any) => {
    const payload = { ...data };
    if (!payload.password) {
      delete payload.password;
    }
    mutation.mutate(payload);
  };

  return (
    <div className="profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-field">
          <label>Username</label>
          <input placeholder="Username" {...register('username', { required: true })} />
          {errors.username && <p>Username is required</p>}
        </div>

        <div className="profile-field">
          <label>Email address</label>
          <input placeholder="Email" {...register('email', { required: true })} />
          {errors.email && <p>Email address is required</p>}
        </div>

        <div className="profile-field">
          <label>New password</label>
          <input
            placeholder="New password"
            type="password"
            {...register('password', { minLength: 6 })}
          />
          {errors.password && <p>Your password needs to be at least 6 characters</p>}
        </div>

        <div className="profile-field">
          <label>Avatar image (url)</label>
          <input placeholder="Avatar image" {...register('image')} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;
