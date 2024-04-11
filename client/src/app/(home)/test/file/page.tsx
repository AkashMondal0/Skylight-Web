import { configs } from '@/configs'
import Image from 'next/image'


export default function Page() {

    
    return (
        <Image
            src={`${configs.supabase.bucketUrl}/adaptive-icon.png`}
            width={500}
            height={500}
            alt="Picture of the author"
        />
    )
}