import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/resumeInfoContext";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import globalApi from "./../../../../../service/globalApi";

const Skills = () => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);
  const addNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const removeSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };
  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest),
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
    setResumeInfo({ ...resumeInfo, skills: skillsList });
  }, [skillsList]);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your Professional Key Skills</p>
      <div>
        {skillsList.map((item, index) => (
          <div className="flex justify-between border mb-3 rounded-lg p-3 ">
            <div>
              <label htmlFor="name">Name</label>
              <Input
                onChange={(event) =>
                  handleChange(index, "name", event.target.value)
                }
                defaultValue={item.name}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary"
            onClick={addNewSkill}
          >
            + Add New Skill
          </Button>
          <Button
            variant="outline"
            className="text-primary"
            onClick={removeSkill}
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
