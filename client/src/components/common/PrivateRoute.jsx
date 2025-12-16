import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingScreen from './LoadingScreen'; // Use your loader

const PrivateRoute = () => {
  const { token, isLoading } = useSelector((state) => state.auth);

  if (isLoading) return <LoadingScreen />;
  
  // If no token, redirect to login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;