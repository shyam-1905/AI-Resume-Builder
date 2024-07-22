import React, { useEffect, useState } from "react";
import AddResume from "./components/addResume";
import globalApi from "./../../service/globalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/resumeCardItem";

function DashBoard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    user && GetResumeList();
  }, [user]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumeList = () => {
    globalApi
      .GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((response) => {
        setResumeList(response.data.data);
      });
  };
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating AI Resume to your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              key={index}
              refreshData={GetResumeList}
            />
          ))}
      </div>
    </div>
  );
}

export default DashBoard;
