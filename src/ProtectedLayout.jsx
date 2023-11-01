import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "./Icons/LogoutIcon";
import { getToken, deleteToken } from "./helper";
import { useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";

const ProtectedLayout = () => {
  const location = useLocation();
  const isAuthenticated = getToken();
  const navigate = useNavigate();
  const isAdmin = false;
  if (!isAuthenticated) {
    if (!location?.state?.auth)
      return <Navigate replace state={{ from: location }} to="/login" />;
  }
  const logout = () => {
    deleteToken();
    navigate("/login");
  };

  return (
    <Wrapper noImg>
      <div className="p-4">
        <div style={{ color: "red" }} className="d-flex justify-content-end">
          <LogoutIcon onClick={logout} />
        </div>
        <ToastContainer />

        <Outlet />
      </div>
    </Wrapper>
  );
};

export default ProtectedLayout;
