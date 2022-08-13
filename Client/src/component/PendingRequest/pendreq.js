import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import "./pendreq.css";
import DescButton from "./DescButton";
import Description from "./Description";
import Response from "./Response";
import { useAuthContext } from "../../AuthContext";
import axiosInstance from "../axios";

const Pendreq = () => {
  const [leaveData, setLeaveData] = useState([]);
  const {user} = useAuthContext()

  const getLeaveData = async () => {
    try {
      const lData = await axiosInstance.get("/api/leaveApply");
      console.log(lData.data.leave);
      if (lData.data.leave) {
        setLeaveData(lData.data.leave);
      }
    } catch (error) {
      console.log(error.error);
      // setErrorMessage(error.error)
    }
  };
  useEffect(() => {
    getLeaveData();
  }, []);

  const [state, setState] = useState({ toggl: false, arrow: faCaretDown });
  function handleClick(e, id) {
    if (id === Number(e.target.id))
      setState((prev) => ({ ...prev, toggl: !prev.toggl }));
    if (state.toggl) {
      setState((prev) => ({ ...prev, arrow: faCaretDown }));
    } else {
      setState((prev) => ({ ...prev, arrow: faCaretUp }));
    }
  }

  const statusHandler = (id,val) => {
    const res = axiosInstance.put('api/leaveApply', {
      status: val
    });
    console.log(leaveData,res);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {[...leaveData].map((emp, index) => {
        const {
          _id,
          userEmail,
          userName,
          status,
          dateApplied,
          leaveType,
          fromDate,
          toDate,
          subject,
          description,
          managerEmail
        } = emp;

        
        for(const email of managerEmail){
        if (email===user.email && status===""){
          console.log(email)
        return (
          <div className="penwrap" key={index}>
            <div className="emname">
              <label>{userName}</label>
              <div className="button">
                <Response
                  response="Accept"
                  className="b1"
                  statusHandler={() => statusHandler(_id,"Accepted")}
                />
                <Response
                  response="Reject"
                  className="b2"
                  statusHandler={() => statusHandler(_id,"Rejected")}
                />
                <DescButton
                  handleClick={handleClick}
                  arrow={state.arrow}
                  key={index}
                  id={index}
                  index={index}
                />
              </div>
            </div>
            <div className="suject">
              <p style={{ padding: "10px" }}>Type of Leave: {leaveType}</p>
              <p style={{ padding: "10px" }}>Subject: {subject}</p>
              <p style={{ padding: "10px", display: "inline-block" }}>
                From Date: {fromDate}
              </p>
              <p style={{ display: "inline-block" }}>To Date: {toDate}</p>
              {state.toggl && <Description description={description} />}
            </div>
          </div>
        );
        }}
      })}
    </div>
  );
};

export default Pendreq;
