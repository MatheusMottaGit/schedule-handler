import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface TextareaProps extends ComponentProps<'textarea'> {
  allowed?: boolean
}

function Textarea({allowed, ...props}: TextareaProps) {
  return (
    <textarea 
      {...props}
      className={twMerge(
        "textarea-scrollbar border col-span-2 h-80 flex-1 border-zinc-700 resize-none bg-zinc-950 rounded-lg p-2 text-sm placeholder:text-zinc-500 text-zinc-500",
        allowed === false && "cursor-not-allowed"
      )}
    />
  )
}

export default Textarea