import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/resumeInfoContext";
import { useParams } from "react-router-dom";
import globalApi from "../../../../service/globalApi";
import { toast } from "sonner";

function ThemeColor() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const [loading, setLoading] = useState(false);
  const { resumeId } = useParams();
  const onColorSelect = (color) => {
    setLoading(true);
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });

    const data = {
      data: {
        themeColor: color,
      },
    };

    globalApi.UpdateResumeDetail(resumeId, data).then(
      (response) => {
        console.log(response);
        setLoading(false);
        toast("Theme Color Updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#FF7133",
    "#71FF33",
    "#7133FF",
    "#FF3371",
    "#33FF71",
    "#3371FF",
    "#A1FF33",
    "#33A1FF",
    "#FF5733",
    "#5733FF",
    "#33FF5A",
    "#5A33FF",
    "#FF335A",
    "#335AFF",
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <LayoutGrid />
              Theme
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              className={`h-5 w-5 rounded-full hover:border-black border cursor-pointer ${
                selectedColor == item && "border border-black"
              } `}
              style={{ background: item }}
              onClick={() => onColorSelect(item)}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
