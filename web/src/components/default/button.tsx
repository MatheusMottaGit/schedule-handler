import { LoaderCircle } from "lucide-react"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { tv, VariantProps } from "tailwind-variants"

const button = tv({
  base: "rounded-lg font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors",
  variants: {
    skin: {
      primary: "bg-zinc-50 hover:bg-zinc-50/90 text-zinc-950",
      secondary: "bg-transparent border text-zinc-50 border-zinc-700 hover:bg-zinc-800",
      important: "border border-red-500/60 text-red-500/60 hover:bg-red-500/60 hover:text-zinc-50"
    },
    size: {
      small: "p-2"
    }
  },
  defaultVariants: {
    skin: "primary"
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof button> {
  isLoading?: string
  children: React.ReactNode
}

function Button({ skin, size, isLoading, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={
        twMerge(button({ skin, size }), "")
      }
      disabled={!!isLoading}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin duration-200" />
      ) : (
        <>
          {children}
        </>
      )}
    </button>
  ) 
}

export default Button