/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import AttendanceContext from "../Provider";
import { useEffect } from "react";

// import {
//   formatDateAs11thMonth,
//   formatTimeFromTimestamp,
// } from "../dateFormatter";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const TimeEnteries = ({ total = 0 }) => {
  const [state, dispatch] = useContext(AttendanceContext);
  const { timeEnteries } = state;

  useEffect(() => {
    dispatch({ type: "FETCH_USER_ENTERIES" });
  }, [dispatch]);

  return (
    <>
      <h3>Summary of last 45 days</h3>
      {total > 0 ? `${total} ahead` : `${total} behind`}
      <div className="mt-4">
        <div className="d-flex justify-content-end ">
          <Link to="/record-screen">Go Back</Link>
        </div>
        <Table bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Date and Month</th>
              <th> CheckIn Time</th>
              <th>CheckOut TIme</th>
              <th>+/-</th>
            </tr>
          </thead>
          <tbody>
            {timeEnteries?.toReversed()?.map((el, index) => {
              const tt =
                randomIntFromInterval(0, 10) - randomIntFromInterval(0, 10);
              console.log(total);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {el.date} {el.month}
                  </td>
                  <td>{el.checkInTime}</td>
                  <td>{el.checkOutTime}</td>

                  <td style={{ backgroundColor: tt >= 0 ? "green" : "red" }}>
                    {tt}
                  </td>
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
