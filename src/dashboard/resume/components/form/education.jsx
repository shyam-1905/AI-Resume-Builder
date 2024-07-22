import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/resumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import globalApi from "./../../../../../service/globalApi";
import { toast } from "sonner";

const Education = () => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  useEffect(() => {
    resumeInfo && setEducationList(resumeInfo?.education);
  }, []);
  const handleChange = (index, event) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };
  const addNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const removeEducation = () => {
    setEducationList((educationList) => educationList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
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
  useEffect(() => {
    setResumeInfo({ ...resumeInfo, education: educationList });
  }, [educationList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add your Education Details</p>

      <div>
        {educationList.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label htmlFor="universityName">University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label htmlFor="degree">Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.degree}
                />
              </div>
              <div>
                <label htmlFor="major">Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.major}
                />
              </div>
              <div>
                <label htmlFor="startDate">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.startDate}
                />
              </div>
              <div>
                <label htmlFor="endDate">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.endDate}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(index, e)}
                  defaultValue={item?.description}
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
            onClick={addNewEducation}
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeEducation}
          >
            - Remove Education
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Education;
