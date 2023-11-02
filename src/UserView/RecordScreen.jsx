/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { addCheckInTime, addCheckOutTime } from "../record-operation";
import { useContext } from "react";
import AttendanceContext from "../Provider";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { formatTimeFromTimestamp } from "../dateFormatter";
const TodayEntry = ({ t_Entry }) => {
  if (!t_Entry) return null;

  return (
    <div
      style={{ border: "4px solid #007bff", borderRadius: "4px" }}
      className="p-1">
      {t_Entry.checkInTime ? (
        <div className="d-block ">
          <span>{"Today's"} check-in time:</span>{" "}
          <span className="fw-bold">
            {formatTimeFromTimestamp(t_Entry.checkInTime)}
          </span>
        </div>
      ) : null}
      {t_Entry?.checkOutTime ? (
        <div className="d-block">
          <span>{"Today's"} check-out time:</span>{" "}
          <span className="fw-bold">
            {" "}
            {formatTimeFromTimestamp(t_Entry.checkOutTime)}
          </span>
        </div>
      ) : null}
    </div>
  );
};

const RecordScreen = () => {
  const [state, dispatch] = useContext(AttendanceContext);
  const { cInEnabled, cOutEnabled, todayEntry } = state;

  const [loading, setLoading] = useState(false);

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
      dispatch({ type: "FETCH_USER_ENTERIES" });
      setLoading(false);
    }
  };
  const enterCheckOutTime = async () => {
    try {
      setLoading(true);
      await addCheckOutTime(state?.timeEnteries);
      toast.success("Check-out time recorded", { toastId: "recchckout" });
    } catch (e) {
      toast.error("Unable to record Check-out time", {
        toastId: "recchckoutfail",
      });
    } finally {
      dispatch({ type: "FETCH_USER_ENTERIES" });
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_USER_ENTERIES" });
  }, [dispatch]);
  return (
    <>
      <div className="d-flex">
        <h3 className="col-6">Record your time</h3>
        <TodayEntry t_Entry={todayEntry} />
      </div>

      <div className="mt-4">
        <div className="d-flex">
          <div>
            {cInEnabled ? (
              <Button
                color="primary"
                className="me-2"
                onClick={enterCheckInTime}
                disabled={loading || !cInEnabled}>
                Record Check-in TIme
              </Button>
            ) : null}
            {cOutEnabled ? (
              <Button
                color="primary"
                className="mx-2"
                onClick={enterCheckOutTime}
                disabled={loading || !cOutEnabled}>
                Record Check-out TIme
              </Button>
            ) : null}
          </div>
        </div>
        {!cInEnabled && !cOutEnabled ? (
          <div className="text-success fw-bold">
            Check-in and Check-out has been marked for today.
          </div>
        ) : null}

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
