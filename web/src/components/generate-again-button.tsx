import { RotateCcw } from "lucide-react"
import Button from "./default/button"
import { RequestOptions } from "ai"

interface GenerateAgainButtonProps {
  completion: string
  complete: (prompt: string, options?: RequestOptions) => Promise<string | null | undefined>
}

function GenerateAgainButton({ complete, completion }: GenerateAgainButtonProps) {
  return(
    <Button onClick={() => complete(completion)} type="button">
      Generate again <RotateCcw className="size-4" />
    </Button>
  )
}

export default GenerateAgainButton  