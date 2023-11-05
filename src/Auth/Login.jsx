import PropTypes from "prop-types";
import Wrapper from "../Wrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Input, Spinner } from "reactstrap";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addAuthEmail, addToken } from "../helper";
import { useContext } from "react";
import AttendanceContext from "./../Provider";

const Login = () => {
  const [state, dispatch] = useContext(AttendanceContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    // console.log(auth.currentUser.email);
    try {
      setLoading(true);
      if (!state?.allowedUsersList?.includes(email.trim())) {
        toast.error("Email not registered or authorisation removed.", {
          toastId: "no_auuth",
        });
        setLoading(false);
        return;
      }
      const response = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      if (response?.user) {
        addToken();
        addAuthEmail(email.trim());

        /**
      TODO admin mode */
        if (email === "abhi@pal.com")
          navigate("/admin", { state: { auth: true } });
        else navigate("/record-screen", { state: { auth: true } });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_ALLOWED_USERS" });
  }, [dispatch]);

  const disabled = !email || !password;

  return (
    <Wrapper>
      <ToastContainer />
      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

        <form className="mx-1 mx-md-4">
          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label className="form-label" htmlFor="form3Example3c">
                {" "}
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="form3Example3c"
                className="form-control"
              />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label className="form-label" htmlFor="form3Example4c">
                Password
              </label>
              <Input
                type="password"
                id="form3Example4c"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                autoComplete="password"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <Button
              color="primary"
              style={{ minWidth: "140px" }}
              className="btn-lg px-4 px-2"
              disabled={disabled}
              onClick={login}>
              {loading ? <Spinner size="sm" /> : "Login"}
            </Button>
          </div>
        </form>
        <div className="form-check d-flex justify-content-center mb-5">
          <label className="form-check-label pointer" htmlFor="form2Example3">
            {"Don't"} have account?{" "}
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}>
              Signup here
            </a>
          </label>
        </div>
      </div>{" "}
    </Wrapper>
  );
};
Login.propTypes = {
  toggle: PropTypes.func,
};

export default Login;
