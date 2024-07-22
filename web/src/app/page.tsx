"use client";
import { toast } from "sonner";
import { handlePrompt } from "../utils/handle-prompt";
import { useCompletion } from "@ai-sdk/react";
import { Sparkles, X } from "lucide-react";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import CopyClipboardButton from "../components/copy-clipboard-button";
import ChooseFileInput from "../components/choose-file-input";
import Textarea from "../components/default/textarea";
import Button from "../components/default/button";
import axios from "axios";
import SaveScheduleButton from "../components/save-schedule-button";
import GeneratedSchedulesList from "../components/generated-schedules-list";
import { UploadAPIResponse } from "../types/upload";
import Toaster from "../components/default/toaster";
import GenerateAgainButton from "../components/generate-again-button";
import SendScheduleButton from "../components/send-schedule-button";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileContent, setFileContent] = useState("");
  const [completed, setCompleted] = useState(false);

  function onSelectFile(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) return;

    const file = files[0];

    setFile(file);

    startTransition(async () => {
      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post<UploadAPIResponse>(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }
          },
        }
      );

      setFileContent(response.data.content);
    });

    setInput("Nada mais a adicionar.");
  }

  const {
    handleSubmit,
    completion,
    input,
    setInput,
    handleInputChange,
    error,
    complete,
    stop,
    isLoading,
  } = useCompletion({
    api: "/api/completion",
    body: {
      prompt: handlePrompt(fileContent),
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }

    if (completion) {
      setCompleted(true);
    }
  }, [error, completion]);

  return (
    <>
      <div className="relative min-h-screen p-8 bg-slate-950 flex justify-start gap-4 font-inter">
        <div className="absolute inset-0 bg-dot-pattern bg-dot-pattern-size text-slate-900"></div>

        <main className="relative flex flex-col gap-4 w-full">
          <div className="flex justify-between bg-slate-950 rounded-xl p-4 items-center border border-slate-800">
            <div className="flex flex-col">
              <h1 className="font-semibold text-slate-200 text-xl">
                Generate schedule by completion
              </h1>

              <span className="text-slate-500">
                Just follow the steps below!
              </span>
            </div>

            <div className="flex items-center gap-2">
              <SaveScheduleButton completion={completion} />

              <SendScheduleButton completion={completion} />

              <CopyClipboardButton completion={completion} />

              <Button size="small" skin="secondary" onClick={stop}>
                <span> Stop generating </span> <X className="size-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1">
            <div className="flex flex-col gap-3">
              <Textarea
                placeholder="Anything more to add..."
                value={input}
                onChange={handleInputChange}
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
                  <ChooseFileInput
                    file={file}
                    isPending={isPending}
                    uploadProgress={uploadProgress}
                    onSelectFile={onSelectFile}
                  />

                  {completed ? (
                    <GenerateAgainButton
                      complete={complete}
                      completion={completion}
                    />
                  ) : (
                    <Button isLoading={isLoading} type="submit">
                      Generate <Sparkles className="size-4" />
                    </Button>
                  )}
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-slate-950 py-1.5 px-3 border border-slate-700">
                <h1 className="text-slate-200 font-semibold">Generated</h1>
              </div>

              <GeneratedSchedulesList />
            </div>
          </div>
        </main>
      </div>

      <Toaster />
    </>
  );
}

export default App;
