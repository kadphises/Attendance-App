import OnboardForm from "./OnboardForn";
import OnboardedUsers from "./OnboardedUsers";
import Wrapper from "./Wrapper";
import { getAllowedEmailList } from "../db";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const Home = () => {
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
    <div className="p-4">
      <div>
        <h4>Hi Abhishek</h4>
        <Wrapper noImg>
          <OnboardForm previousList={previousList} fetchAgain={fetchMyList} />
          <OnboardedUsers users={previousList} fetchAgain={fetchMyList} />
        </Wrapper>
      </div>
      {/* <div>
        <Button color="primary" className="mx-3" onClick={recordTime}>
          Record CheckIn time
        </Button>
        <Button color="primary" className="mx-3">
          Record CheckOut time
        </Button>{" "}
      </div> */}
    </div>
  );
};

export default Home;
