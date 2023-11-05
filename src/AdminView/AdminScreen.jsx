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
      <OnboardedUsers
        users={state?.allowedUsersList}
        fetchAgain={() => dispatch({ type: "FETCH_ALLOWED_USERS" })}
      />
    </>
  );
};

export default AdminScreen;
