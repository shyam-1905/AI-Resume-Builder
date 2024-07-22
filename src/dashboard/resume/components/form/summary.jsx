import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/resumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import globalApi from "./../../../../../service/globalApi";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { aiChatSession } from "./../../../../../service/aiModel";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summery: summary,
      });
  }, [summary]);
  const generateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await aiChatSession.sendMessage(PROMPT);
    console.log(result.response.text());
    setAiGeneratedSummary(JSON.parse(result.response.text()));
    setLoading(false);
  };
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: { summery: summary },
    };
    globalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (response) => {
        console.log(response);
        enabledNext(true);
        setLoading(false);
        toast("Details Updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary to your Resume</p>
        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="">Add Summary</label>
            <Button
              variant="outline"
              size="sm"
              className="border-primary shadow-md text-primary flex gap-2"
              type="button"
              onClick={() => generateSummaryFromAI()}
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            onChange={(e) => setSummary(e.target.value)}
            required
            value={summary}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummary && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummary.map((item, index) => (
            <div key={index} onClick={() => setSummary(item?.summary)}>
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Summary;
