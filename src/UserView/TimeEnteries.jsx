/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import AttendanceContext from "../Provider";
import { useEffect } from "react";
import {
  calculateTimeElapsed,
  formatDateAs11thMonth,
  formatTimeFromTimestamp,
} from "../dateFormatter";

const TimeEnteries = () => {
  const [state, dispatch] = useContext(AttendanceContext);
  const { timeEnteries, summary, isFetchingTimeEnteries } = state;
  useEffect(() => {
    dispatch({ type: "FETCH_USER_ENTERIES" });
  }, [dispatch]);
  return (
    <>
      <h3>Summary of enteries</h3>
      {summary !== null ? (
        <div>
          {isFetchingTimeEnteries ? (
            <p className="placeholder-glow">
              <span className="placeholder col-8"></span>
            </p>
          ) : (
            <p>
              You are currently
              <span
                className="fw-bold"
                style={{ color: summary?.status ? "green" : "red" }}>
                {summary?.status
                  ? ` ${calculateTimeElapsed(summary?.sum_time)} ahead `
                  : ` ${calculateTimeElapsed(summary?.sum_time)} behind `}
              </span>{" "}
              the schedule for this month
            </p>
          )}{" "}
        </div>
      ) : null}
      <div className="d-flex justify-content-end ">
        <Link to="/record-screen">Go Back</Link>
      </div>
      <div className="mt-2">
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Date and Month</th>
              <th> CheckIn Time</th>
              <th>CheckOut TIme</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {timeEnteries?.toReversed()?.map((el, index) => {
              const { checkOutTime, checkInTime } = el;
              const bothExist = checkInTime && checkOutTime;
              const tt = bothExist ? checkOutTime - checkInTime : "-";
              // const elapsedTime = Math.abs(tt);
              const nineHoursInMillisecondsDiff = bothExist
                ? 9 * 60 * 60 * 1000 - tt
                : null;

              const timeStr = bothExist
                ? calculateTimeElapsed(Math.abs(nineHoursInMillisecondsDiff))
                : null;
              const s = bothExist
                ? {
                    backgroundColor:
                      nineHoursInMillisecondsDiff >= 0 ? "red" : "green",
                  }
                : {};
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDateAs11thMonth(checkInTime)}</td>
                  <td>{formatTimeFromTimestamp(checkInTime)}</td>
                  <td>
                    {checkOutTime
                      ? formatTimeFromTimestamp(checkOutTime)
                      : null}
                  </td>
                  <td style={s}>{timeStr}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>{" "}
    </>
  );
};

export default TimeEnteries;
