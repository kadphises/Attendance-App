import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { isAuthenticated } from '@/helpers/login';

// import Layout from './Layout';

const ProtectedLayout = () => {
  const location = useLocation();
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
