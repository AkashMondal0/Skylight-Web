import { RotateCcw } from "lucide-react"

export const ImageError = () => {
    return (<div className={`aspect-square w-full object-cover
    flex flex-col items-center justify-center space-y-4 userNotSelectImg bg-muted`}>
        <RotateCcw className='w-10 h-10 cursor-pointer' strokeWidth={1.2}/>
        <p className="text-center text-sm cursor-pointer">{`Could't load image. Tap to retry`}</p>
    </div>)
}