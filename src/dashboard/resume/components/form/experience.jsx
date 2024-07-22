import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../richTextEditor";
import { ResumeInfoContext } from "@/context/resumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import globalApi from "./../../../../../service/globalApi";
import { toast } from "sonner";

function Experience() {
  const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummery: "",
  };
  const params = useParams();
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(resumeInfo);
    resumeInfo?.experience.length > 0 &&
      setExperienceList(resumeInfo?.experience);
  }, []);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };
  const addNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };
  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };
    globalApi.UpdateResumeDetail(params.resumeId, data).then(
      (response) => {
        console.log(response);
        setLoading(false);
        toast("Details Updated");
      },
      (error) => {
        setLoading(false);
        toast("server error,try again");
      }
    );
  };
  const handleRichTextEditorChange = (event, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = event.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Job Experience</h2>
      <p>Add your Previous Job Experience</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 p-3 my-5 rounded-lg">
              <div>
                <label htmlFor="title" className="text-xs">
                  Position Title
                </label>
                <Input
                  name="title"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.title}
                />
              </div>
              <div>
                <label htmlFor="companyName" className="text-xs">
                  Company Name
                </label>
                <Input
                  name="companyName"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.companyName}
                />
              </div>
              <div>
                <label htmlFor="city" className="text-xs">
                  City
                </label>
                <Input
                  name="city"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.city}
                />
              </div>
              <div>
                <label htmlFor="state" className="text-xs">
                  State
                </label>
                <Input
                  name="state"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.state}
                />
              </div>
              <div>
                <label htmlFor="startDate" className="text-xs">
                  Start Date
                </label>
                <Input
                  name="startDate"
                  type="date"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label htmlFor="endDate" className="text-xs">
                  End Date
                </label>
                <Input
                  name="endDate"
                  type="date"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.endDate}
                />
              </div>
              {/**Rich Text Editor */}
              <div className="col-span-2">
                <RichTextEditor
                  onRichTextEditorChange={(event) =>
                    handleRichTextEditorChange(event, "workSummery", index)
                  }
                  index={index}
                  defaultValue={item?.workSummery}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={addNewExperience}
          >
            + Add More Experience
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeExperience}
          >
            - Remove Experience
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
