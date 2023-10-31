import PropTypes from "prop-types";
import Wrapper from "./Wrapper";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, FormFeedback, Input } from "reactstrap";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [already, setAlready] = useState(false);

  const signUp = async () => {
    setAlready(false);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (response.error.message === "EMAIL_EXISTS") {
        setAlready(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const disabled = !email || !password || !cPassword || cPassword !== password;
  return (
    <Wrapper>
      {" "}
      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

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
                invalid={already}
                onChange={(e) => setEmail(e.target.value)}
                id="form3Example3c"
                className="form-control"
              />
              <FormFeedback invalid>Email already exists.</FormFeedback>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label
                className="form-label"
                htmlFor="form3Example4c"
                autoComplete="new-password">
                Password
              </label>
              <Input
                type="password"
                id="form3Example4c"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <label className="form-label" htmlFor="form3Example4cd">
                Confirm password
              </label>
              <Input
                type="password"
                id="form3Example4cd"
                className="form-control"
                invalid={password && cPassword && password !== cPassword}
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                autoComplete="confirm-password"
              />
              <FormFeedback invalid> Password do not match.</FormFeedback>
            </div>
          </div>

          <div className="form-check d-flex justify-content-center mb-5">
            <Input
              className="form-check-Input me-2"
              type="checkbox"
              value=""
              id="form2Example3c"
            />
            <label className="form-check-label" htmlFor="form2Example3">
              I agree all statements in <a href="#!">Terms of service</a>
            </label>
          </div>

          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <Button
              color="primary"
              className="btn-lg"
              disabled={disabled}
              onClick={signUp}>
              Register
            </Button>
          </div>
        </form>
        <div className="form-check d-flex justify-content-center mb-5">
          <label className="form-check-label" htmlFor="form2Example3">
            Already have account?{" "}
            <a
              href="#!"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}>
              Login here
            </a>
          </label>
        </div>
      </div>{" "}
    </Wrapper>
  );
};
Signup.propTypes = {
  toggle: PropTypes.func,
};

export default Signup;
