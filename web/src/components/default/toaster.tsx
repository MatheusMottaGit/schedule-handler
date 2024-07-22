import { CircleAlert, CircleCheck, Loader } from 'lucide-react'
import { Toaster as SonnerToaster } from 'sonner'

function Toaster() {
  return (
    <SonnerToaster 
      position="bottom-right"
      style={{ 
        backgroundColor: "#09090b",
        marginTop: "-1.2rem"
      }}
      toastOptions={{
        classNames: {
          success: "text-emerald-600 bg-slate-950 border-slate-700",
          error: "text-red-600 bg-slate-950 border-slate-700",
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