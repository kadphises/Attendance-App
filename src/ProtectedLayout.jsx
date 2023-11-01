import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedLayout = () => {
  const location = useLocation();
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
