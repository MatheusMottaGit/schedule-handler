import { ChangeEventHandler } from "react";
import { CheckCircle, CloudUpload } from "lucide-react";

interface ChooseFileInputProps {
  file: File | null;
  isPending: boolean;
  uploadProgress: number;
  onSelectFile?: ChangeEventHandler<HTMLInputElement>
}

function ChooseFileInput({ file, isPending, uploadProgress, onSelectFile }: ChooseFileInputProps) {
  return (
    <>
      <label
        htmlFor="pdf_file"
        className="relative border border-slate-700 rounded-lg aspect-auto h-full bg-slate-950 text-white cursor-pointer border-dashed flex gap-2 items-center justify-center hover:bg-slate-900/80"
      >
        {file ? (
          isPending || uploadProgress < 100 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-center text-slate-400 font-medium">
                {file.name.substring(0, 30).concat("...")}
              </p>

              <div className="bg-slate-800 w-full overflow-hidden h-3 rounded-full">
                <div 
                  className="h-full bg-slate-200 w-24" 
                  style={{
                    width: `${uploadProgress}%`
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <CheckCircle className="size-4 text-emerald-600" /> <span className="opacity-80 font-medium">Upload succeeded!</span>
            </div>
          )
        ) : (
          <div className="flex items-center gap-3">
            <CloudUpload className="text-white" />

            <div className="flex flex-col">
              Choose file
              <span className="text-sm opacity-70 text-violet-400 underline">
                Search in your machine
              </span>
            </div>
          </div>
        )}
      </label>

      <input
        type="file"
        id="pdf_file"
        className="sr-only"
        onChange={onSelectFile}
      />
    </>
  );
}

export default ChooseFileInput;
