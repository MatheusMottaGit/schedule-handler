"use client";
import { handlePrompt } from "../utils/handle-prompt";
import { useCompletion } from "@ai-sdk/react";
import { ChangeEvent, useState } from "react";
import { LoaderCircle, WandSparkles } from "lucide-react";
import ClipboardButton from "../components/clipboard-button";
import Textarea from "../components/textarea";
import Button from "../components/button";
import axios from "axios";
import ChooseFile from "../components/choose-file";

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

  const { handleSubmit, completion, isLoading, input, handleInputChange, } = useCompletion({
    api: "/api/completion",
    body: {
      prompt: handlePrompt(fileContent)
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });

  return (
    <div className="relative min-h-screen px-5 bg-zinc-900 flex items-center gap-4 justify-center font-inter">
      <div className="absolute inset-0 bg-dot-pattern bg-dot-pattern-size text-zinc-800"></div>

      <main className="relative bg-zinc-900 shadow-md rounded-md border w-3/4 border-zinc-700 p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-semibold text-white text-xl">
              Generate schedule by completion
            </h1>

            <span className="text-zinc-500">
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
