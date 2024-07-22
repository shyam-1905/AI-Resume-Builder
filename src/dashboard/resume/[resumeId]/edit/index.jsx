import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/formSection";
import ResumePreview from "../../components/resumePreview";
import { ResumeInfoContext } from "@/context/resumeInfoContext";
import dummy from "@/data/dummy";
import globalApi from "./../../../../../service/globalApi";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  useEffect(() => {
    GetResumeInfo();
  }, []);
  const GetResumeInfo = () => {
    globalApi.GetResumeById(resumeId).then((response) => {
      console.log(response.data.data);
      setResumeInfo(response.data.data);
    });
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10 ">
        {/*Form Section  */}
        <FormSection />
        {/* Resume Preview Section  */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
