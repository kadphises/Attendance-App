/* eslint-disable react/prop-types */
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
import { Button, Input, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { sendAllowedList } from "../db";
import { useContext } from "react";
import AttendanceContext from "../Provider";

const Onboard = () => {
  const [email, setEmail] = useState("");
  const [state, dispatch] = useContext(AttendanceContext);

  const [loading, setLoading] = useState(false);
  const addUser = async () => {
    try {
      setLoading(true);

      if (!state?.allowedUsersList?.includes(email.trim())) {
        await sendAllowedList([...state.allowedUsersList, email]);

        toast.success("User added successfully!", { toastId: "success" });
      } else {
        toast.warn("User already registered.", { toastId: "already" });
      }
    } catch (e) {
      toast.error("Something went wrong.", { toastId: "wrong" });

      console.log(e);
    } finally {
      dispatch({ type: "FETCH_ALLOWED_USERS" });
      setLoading(false);
    }
  };
  const disabled = !email || loading;

  return (
    <div className="col-md-10 col-lg-6 col-xl-5">
      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add User</p>

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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="form3Example3c"
              className="form-control"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
          <Button
            color="primary"
            style={{ minWidth: "140px" }}
            className="btn-lg px-4 px-2"
            disabled={disabled}
            onClick={addUser}>
            {loading ? <Spinner size="sm" /> : "Add User"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Onboard;
