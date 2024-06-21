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
        "border col-span-2 h-52 border-slate-700 resize-none rounded p-2 text-sm bg-transparent placeholder:text-slate-500 text-slate-500",
        allowed === false && "cursor-not-allowed"
      )}
    />
  )
}

export default Textarea