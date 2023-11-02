import OnboardForm from "./OnboardForn";
import OnboardedUsers from "./OnboardedUsers";

import { useEffect } from "react";

import { useContext } from "react";
import AttendanceContext from "./../Provider";

const AdminScreen = () => {
  const [state, dispatch] = useContext(AttendanceContext);

  useEffect(() => {
    dispatch({ type: "FETCH_ALLOWED_USERS" });
  }, [dispatch]);

  return (
    <>
      <OnboardForm state={state} />
      <OnboardedUsers />
      {/* <div>
        <Button color="primary" className="mx-3" onClick={recordTime}>
          Record CheckIn time
        </Button>
        <Button color="primary" className="mx-3">
          Record CheckOut time
        </Button>{" "}
      </div> */}
    </>
  );
};

export default AdminScreen;
