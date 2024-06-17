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
      className: 'bg-zinc-900 border-zinc-700 text-zinc-300'
    })
  }

  return (
    <div className="size-8">
      <Button variant="secondary" onClick={copyToClipboard}>
        <Clipboard className="size-4 opacity-80" />
      </Button>

      <Toaster />
    </div>
  )
}

export default ClipboardButton