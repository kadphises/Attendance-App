import OnboardForm from "./OnboardForn";
import OnboardedUsers from "./OnboardedUsers";
import { getAllowedEmailList } from "../db";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const AdminScreen = () => {
  const [previousList, setPreviousList] = useState([]);
  const fetchMyList = useCallback(async () => {
    const pList = await getAllowedEmailList();

    console.log(pList);
    if (pList) setPreviousList(pList);
  }, []); // if userId changes, useEffect will run again

  useEffect(() => {
    fetchMyList();
  }, [fetchMyList]);

  return (
    <>
      <OnboardForm previousList={previousList} fetchAgain={fetchMyList} />
      <OnboardedUsers users={previousList} fetchAgain={fetchMyList} />
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
