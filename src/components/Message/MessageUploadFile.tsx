import OptimizedImage from '@/components/sky/SkyImage';
import { PlusCircle } from 'lucide-react';
import { Cancel } from '../sky/icons';
import { memo } from 'react';

export const UploadFileList = memo(function UploadFileList({
    assets,
    removeItem,
    addItem
}: {
    assets: File[],
    removeItem: (id: string) => void,
    addItem: () => void
}) {
    if (assets.length <= 0) return <></>

    return (
        <div>
            <div className='flex items-center justify-center flex-wrap gap-2 p-2 w-auto max-h-60 overflow-y-auto'>
                {assets.map((asset) => {
                    if (asset.type.includes("image")) {
                        return (<ImageItem id={asset.name} key={asset.name}
                            src={URL.createObjectURL(asset)} removeItem={removeItem} />)
                    }
                })}
                <div className='w-[100px] h-[100px] border rounded-xl hover:bg-accent'>
                    <PlusCircle onClick={addItem} className='cursor-pointer w-full h-full p-5' />
                </div>
            </div>
        </div>
    )
}, ((pre, next) => pre.assets.length === next.assets.length))

const ImageItem = memo(function ImageItem({
    src,
    removeItem,
    id
}: {
    src: string,
    removeItem: (id: string) => void,
    id: string
}) {
    return (
        <div className='w-[100px] h-[100px] rounded-xl aspect-square'>
            <div className='flex justify-end cursor-pointer h-0' onClick={() => removeItem(id)}>
                <div className='bg-red-500 hover:bg-red-600 w-6 h-6 rounded-full flex justify-center items-center border border-white z-50'>
                    {Cancel()}
                </div>
            </div>
            <OptimizedImage
                isServerImage={false}
                className='rounded-xl border hover:opacity-60 h-full object-cover w-full'
                src={src} alt="image" width={100} height={100} />
        </div>
    )
}, ((pre, next) => true))