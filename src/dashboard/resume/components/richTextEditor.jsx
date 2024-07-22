import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/resumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { aiChatSession } from "./../../../../service/aiModel";
import { toast } from "sonner";

const prompt =
  " position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags just give response in html tags.expected output : [<li></li>,<li></li>]";

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const generateFromAI = async (index) => {
    setLoading(true);
    if (!resumeInfo?.experience[index].title) {
      toast("Please Add Position Title ");
      return;
    }
    const PROMPT = prompt.replace(
      "{positionTitle}",
      resumeInfo?.experience[index].title
    );
    console.log(PROMPT);
    const result = await aiChatSession.sendMessage(PROMPT);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };
  return (
    <div>
      <div className="flex justify-between my-2">
        <label htmlFor="">Summary</label>
        <Button
          variant="outline"
          size="sm"
          className="border-primary shadow-md text-primary flex gap-2"
          type="button"
          onClick={() => generateFromAI(index)}
        >
          {" "}
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> "Generate from AI"{" "}
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
