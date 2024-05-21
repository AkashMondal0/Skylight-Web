import { RotateCcw } from "lucide-react"

export const PostError = () => {
    return (<div className={`aspect-square 
    hover:opacity-50 w-full object-cover
    flex flex-col items-center justify-center
    space-y-4
    userNotSelectImg bg-muted`}>
        <RotateCcw className='w-10 h-10' />
        <p className="text-center text-sm">{`Could't load image. Tap to retry`}</p>
    </div>)
}