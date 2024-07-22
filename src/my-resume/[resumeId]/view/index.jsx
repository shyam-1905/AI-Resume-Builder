import Header from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import ResumePreview from "@/dashboard/resume/components/resumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import globalApi from "./../../../../service/globalApi";
import { ResumeInfoContext } from "@/context/resumeInfoContext";
import { RWebShare } from "react-web-share";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  useEffect(() => {
    getResumeInfo();
  }, []);
  const getResumeInfo = () => {
    globalApi.GetResumeById(resumeId).then((response) => {
      console.log(response);
      setResumeInfo(response.data.data);
    });
  };
  const handleDownload = () => {
    window.print();
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />
        <div>
          <h2 className="text-center text-2xl font-medium">
            Your AI Generated Resume is Ready!!!!!
            <p className="text-center text-gray-400">
              Now you are ready to Download your Resume and Share to your
              Freinds!
            </p>
          </h2>
          <div className="flex justify-between px-44 my-10 ">
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hello Frnds This is My Resume",
                url:
                  import.meta.env.VITE_BASE_URL +
                  "/my-resume/" +
                  resumeId +
                  "/view",
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button>Share 🔗</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx-36">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
