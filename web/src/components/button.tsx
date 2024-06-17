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
          "bg-violet-700/70 rounded p-2 hover:bg-violet-700/80 text-white flex items-center justify-center gap-1 cursor-pointer",
          variant === "secondary" && "bg-transparent border border-zinc-700 hover:bg-zinc-800"
        )
      }
    />
  ) 
}

export default Button