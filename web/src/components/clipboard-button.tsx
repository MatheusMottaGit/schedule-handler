import { Clipboard } from "lucide-react"
import Button from "./button"
import { Toaster, toast } from 'sonner'

interface ClipboardButtonProps {
  completion: string
}

function ClipboardButton({ completion }: ClipboardButtonProps) {
  async function copyToClipboard() {
    await navigator.clipboard.writeText(completion)

    toast.success("Copied to clipboard!", {
      className: 'bg-slate-900 border-slate-700 text-slate-300'
    })
  }

  return (
    <div className="size-8">
      <Button onClick={copyToClipboard}>
        <Clipboard className="size-4" />
      </Button>

      <Toaster />
    </div>
  )
}

export default ClipboardButton