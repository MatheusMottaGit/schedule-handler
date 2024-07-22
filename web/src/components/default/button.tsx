import { LoaderCircle } from "lucide-react"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { tv, VariantProps } from "tailwind-variants"

const button = tv({
  base: "rounded-lg font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors",
  variants: {
    skin: {
      primary: "bg-slate-50 hover:bg-slate-50/90 text-slate-950",
      secondary: "bg-transparent border text-slate-50 border-slate-700 hover:bg-slate-800",
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
  isLoading?: boolean
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