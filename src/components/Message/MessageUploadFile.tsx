import { Assets } from '@/types';
import OptimizedImage from '@/components/sky/SkyImage';
import { useCallback } from "react";

export const UploadFileList = ({
    assets
}: {
    assets: Assets[]
}) => {
    const handleFileUpload = useCallback(() => {
        document?.getElementById('files')?.click()
    }, [])

    if (assets.length <= 0) return <></>
    return <div className='flex items-center'>
        {
            assets.map((asset, index) => {
                if (asset.type === "image") {
                    return <div className='w-[100px] h-[100px]' key={index}>
                        <OptimizedImage
                            src={URL?.createObjectURL(asset.url as any)}
                            alt="image" width={100} height={100} />
                    </div>
                }
                if (asset.type === "video") {
                    return <video src={URL?.createObjectURL(asset.url as any)} width="100" height="100" controls key={index}></video>
                }
                if (asset.type === "audio") {
                    return <audio key={index} src={URL?.createObjectURL(asset.url as any)} controls />
                }
                return <div key={index} className='bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 p-2 rounded-3xl'>
                    {asset.caption}
                </div>
            })
        }
    </div>
}