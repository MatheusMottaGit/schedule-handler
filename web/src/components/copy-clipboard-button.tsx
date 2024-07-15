import { Clipboard } from "lucide-react"
import Button from "./default/button"
import { toast } from 'sonner'

interface CopyClipboardButtonProps {
  completion: string
}

function CopyClipboardButton({ completion }: CopyClipboardButtonProps) {
  async function copyToClipboard() {
    await navigator.clipboard.writeText(completion)
    toast.success("Copied to clipboard!")
  }

  return (
    <Button skin="secondary" size="small" onClick={copyToClipboard}>
      <Clipboard className="size-4" />
    </Button>
  )
}

export default CopyClipboardButton