import { ResumeInfoContext } from "@/context/resumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailsPreview from "./preview/personalDetailsPreview";
import SummaryPreview from "./preview/summaryPreview";
import ExperiencePreview from "./preview/experiencePreview";
import EducationalPreview from "./preview/educationalPreview";
import SkillsPreview from "./preview/skillsPreview";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      {/* Personal Details*/}
      <PersonalDetailsPreview resumeInfo={resumeInfo} />
      {/*Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience*/}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Educational */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/*skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
