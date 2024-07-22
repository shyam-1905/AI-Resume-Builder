import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import globalApi from "./../../../service/globalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { user } = useUser();
  const navigate = useNavigate();

  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    let data = {
      data: {
        title: resumetitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    globalApi.CreateNewResume(data).then(
      (response) => {
        console.log(response);
        if (response) {
          setLoading(false);
          setResumetitle("");
          navigate(
            "/dashboard/resume/" + response.data.data.documentId + "/edit"
          );
        }
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume </p>
              {error ? <p className="text-red-500">{error}</p> : ""}
              <Input
                className="mt-2"
                placeholder="Ex.Full Stack Developer"
                onChange={(e) => setResumetitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                onClick={() => onCreate()}
                disabled={!resumetitle || loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
