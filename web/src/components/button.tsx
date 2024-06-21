import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends ComponentProps<'button'> {
  variant?: string
}

function Button({variant, ...props}: ButtonProps) {
  return (
    <button
      {...props}
      className={
        twMerge(
          "bg-slate-50 rounded p-2 hover:bg-slate-50/90 font-medium flex items-center justify-center gap-1 cursor-pointer",
          variant === "secondary" && "bg-transparent border border-slate-700 hover:bg-slate-800"
        )
      }
    />
  ) 
}

export default Button