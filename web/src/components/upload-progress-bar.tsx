interface UploadProgressBarProps {
  uploadProgress: number
}

function UploadProgressBar({ uploadProgress }: UploadProgressBarProps) {
  return (
    <div className="bg-slate-800 w-full overflow-hidden h-3 rounded-full">
      <div 
        className="h-full bg-slate-200 w-24" 
        style={{
          width: `${uploadProgress}%`
        }}
      />
    </div>
  )
}

export default UploadProgressBar