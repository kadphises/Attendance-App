import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { addCheckInTime, addCheckOutTime } from "../record-operation";
import { useContext } from "react";
import AttendanceContext from "../Provider";
import { toast } from "react-toastify";
import { useState } from "react";

const RecordScreen = () => {
  const [state] = useContext(AttendanceContext);
  const [loading, setLoading] = useState(false);
  console.log(state);

  const enterCheckInTime = async () => {
    try {
      setLoading(true);
      await addCheckInTime();
      toast.success("Check-in time recorded", { toastId: "recchckin" });
    } catch (e) {
      toast.error("Unable to record CheckIn time", {
        toastId: "recchckinfail",
      });
    } finally {
      setLoading(false);
    }
  };
  const enterCheckOutTime = async () => {
    try {
      setLoading(true);
      await addCheckOutTime();
      toast.success("Check-out time recorded", { toastId: "recchckout" });
    } catch (e) {
      toast.error("Unable to record Check-out time", {
        toastId: "recchckoutfail",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Record your time</h3>
      <div className="mt-4">
        <div>
          <Button
            color="primary"
            className="me-2"
            onClick={enterCheckInTime}
            disabled={loading}>
            Record Check-in TIme
          </Button>
          <Button color="primary" className="mx-2" onClick={enterCheckOutTime}>
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
