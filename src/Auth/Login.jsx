import PropTypes from "prop-types";
import Wrapper from "./Wrapper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Input } from "reactstrap";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response?.user) {
        console.log(response?.user);
        /**
        TODO :set auth true here */
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const disabled = !email || !password;

  return (
    <Wrapper>
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
              className="btn-lg"
              disabled={disabled}
              onClick={login}>
              {" "}
              Login
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
