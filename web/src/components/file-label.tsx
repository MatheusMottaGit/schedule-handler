import FileNotSelected from "./file-not-selected";
import UploadProgressBar from "./upload-progress-bar";
import UploadSucceeded from "./upload-succeeded";

interface FileLabelProps {
  file: File | null;
  isUploading: boolean;
  uploadProgress: number;
}

function FileLabel({ file, isUploading, uploadProgress }: FileLabelProps) {
  return (
    <label
      htmlFor="pdf_file"
      className="relative border border-zinc-500 rounded-md aspect-auto h-full bg-zinc-800/20 text-white  cursor-pointer border-dashed flex gap-2 items-center justify-center hover:bg-zinc-800/80"
    >
      {file ? (
        isUploading || uploadProgress < 100 ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-center text-zinc-400 font-medium">
              {file.name.substring(0, 30).concat("...")}
            </p>

            <UploadProgressBar uploadProgress={uploadProgress} />
          </div>
        ) : (
          <UploadSucceeded />
        )
      ) : (
        <FileNotSelected />
      )}
    </label>
  );
}

export default FileLabel;
