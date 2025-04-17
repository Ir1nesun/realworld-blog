import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import React from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sing-in" />;
  }

  return children;
};

export default PrivateRoute;
