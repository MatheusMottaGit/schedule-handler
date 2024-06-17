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
        "border col-span-2 h-44 border-zinc-600 resize-none rounded p-2 text-sm bg-transparent placeholder:text-zinc-500 text-zinc-500",
        allowed === false && "cursor-not-allowed"
      )}
    />
  )
}

export default Textarea