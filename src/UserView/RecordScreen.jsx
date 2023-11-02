import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { addCheckInTime } from "../record-operation";
import { useContext } from "react";
import AttendanceContext from "../Provider";

const RecordScreen = () => {
  const [state] = useContext(AttendanceContext);
  console.log(state);

  const enterCheckInTime = async () => {};
  return (
    <>
      <h3>Record your time</h3>
      <div className="mt-4">
        <div>
          <Button color="primary" className="me-2" onClick={enterCheckInTime}>
            Record Check-in TIme
          </Button>
          <Button
            color="primary"
            className="mx-2"
            onClick={async () => await addCheckInTime()}>
            Record Check-out TIme
          </Button>{" "}
        </div>
        <div>
          <div className="d-flex justify-content-end">
            <Link to="/time-enteries">View last 45 days data</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordScreen;
