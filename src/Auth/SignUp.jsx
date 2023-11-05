import PropTypes from "prop-types";
import Wrapper from "../Wrapper";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Button, FormFeedback, Input, Spinner } from "reactstrap";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addAuthEmail, addToken } from "../helper";
import { useContext } from "react";
import AttendanceContext from "./../Provider";

const Signup = () => {
  const [state, dispatch] = useContext(AttendanceContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    try {
      setLoading(true);
      if (!state?.allowedUsersList?.includes(email.trim())) {
        toast.error("Email not authorised by admin.", { toastId: "no_auth" });
        setLoading(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, email.trim(), password);
      addToken();
      addAuthEmail(email.trim());
      /**
      TODO admin mode */
      if (email === "abhi@pal.com")
        navigate("/admin", { state: { auth: true } });
      else navigate("/record-screen", { state: { auth: true } });
    } catch (e) {
      toast.error("Email already registred.", { toastId: "already" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch({ type: "FETCH_ALLOWED_USERS" });
  }, [dispatch]);
  const disabled = !email || !password || !cPassword || cPassword !== password;

  return (
    <Wrapper>
      <ToastContainer />
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
                onChange={(e) => setEmail(e.target.value)}
                id="form3Example3c"
                className="form-control"
              />
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
              style={{ minWidth: "140px" }}
              className="btn-lg px-4 px-2"
              disabled={disabled}
              onClick={signUp}>
              {loading ? <Spinner size="sm" /> : "Register"}
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
