import { CircleAlert, CircleCheck, Loader } from 'lucide-react'
import { Toaster as SonnerToaster } from 'sonner'

function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      className="bg-zinc-950 text-slate-300 gap-1"
      toastOptions={{
        classNames: {
          success: "text-emerald-600",
          error: "text-red-600",
        }
      }}
      icons={{
        success: <CircleCheck className='size-4'/>,
        error: <CircleAlert className='size-4'/>,
        loading: <Loader className='size-4'/>
      }}
    />
  )
}

export default Toaster