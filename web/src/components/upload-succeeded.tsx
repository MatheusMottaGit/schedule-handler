import { CheckCircle } from "lucide-react"

function UploadSucceeded() {
  return (
    <div className="flex gap-2 items-center">
      <CheckCircle className="size-4 text-emerald-600" /> <span className=" opacity-80 font-medium">Upload succeeded!</span>
    </div>
  )
}

export default UploadSucceeded