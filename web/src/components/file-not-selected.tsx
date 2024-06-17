import { CloudUpload } from "lucide-react"

function FileNotSelected() {
  return (
    <div className="flex items-center gap-3">
      <CloudUpload className="text-white" />

      <div className="flex flex-col">
        Choose file
        <span className="text-sm opacity-70 text-violet-400 underline">
          Search in your machine
        </span>
      </div>
    </div>
  )
}

export default FileNotSelected