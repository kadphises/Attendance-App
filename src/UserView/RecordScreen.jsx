import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const RecordScreen = () => {
  return (
    <>
      <h3>Record your time</h3>
      <div className="mt-4">
        <div>
          <Button color="primary" className="me-2">
            Record Check-in TIme
          </Button>
          <Button color="primary" className="mx-2">
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
