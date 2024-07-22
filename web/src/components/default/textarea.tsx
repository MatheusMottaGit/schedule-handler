import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TextareaProps extends ComponentProps<"textarea"> {
  allowed?: boolean;
}

function Textarea({ allowed, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={twMerge(
        "textarea-scrollbar border flex-1 border-slate-700 resize-none bg-slate-950 rounded-lg p-2 placeholder:text-slate-500 text-slate-500",
        allowed === false && "cursor-not-allowed"
      )}
    />
  );
}

export default Textarea;
