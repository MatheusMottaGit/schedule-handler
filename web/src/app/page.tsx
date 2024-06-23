"use client";
import { handlePrompt } from "../utils/handle-prompt";
import { useCompletion } from "@ai-sdk/react";
import { ChangeEvent, useEffect, useState } from "react";
import { LoaderCircle, WandSparkles } from "lucide-react";
import ClipboardButton from "../components/clipboard-button";
import Textarea from "../components/textarea";
import Button from "../components/button";
import axios from "axios";
import ChooseFile from "../components/choose-file";
import { toast } from "sonner";

interface UploadAPIResponse {
  content: string
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileContent, setFileContent] = useState<string>("")

  async function onSelectFile(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    setFile(file);

    if (file) {
      setIsUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post<UploadAPIResponse>("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        },
      });

      setIsUploading(false);

      setFileContent(response.data.content)
    }
  }

  const { handleSubmit, completion, isLoading, input, handleInputChange, error } = useCompletion({
    api: "/api/completion",
    body: {
      prompt: handlePrompt(fileContent)
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });

  useEffect(() => {
    if(error) {
      toast.error(error.message, {
        className: "bg-slate-900 border-slate-700 text-slate-300"
      })
    }
  }, [error])

  return (
    <div className="relative min-h-screen px-5 bg-slate-950 flex items-center gap-4 justify-center font-inter">
      <div className="absolute inset-0 bg-dot-pattern bg-dot-pattern-size text-slate-900"></div>

      <main className="relative bg-slate-950 shadow-md rounded-md border w-5/6 border-slate-800 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-semibold text-slate-200 text-xl">
              Generate schedule by completion
            </h1>

            <span className="text-slate-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </div>

          <ClipboardButton completion={completion}/>
        </div>

        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="Anything more to add?"
            allowed
            onChange={handleInputChange}
            value={input}
          />

          <Textarea
            placeholder="Just wait for AI's answer..."
            allowed={false}
            readOnly
            value={completion}
            id="completion"
          />

          <form onSubmit={handleSubmit}>
            <div className="h-16 grid grid-cols-2 gap-3">
              <ChooseFile 
                file={file}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                onSelectFile={onSelectFile}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <>
                    Generate <WandSparkles className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
