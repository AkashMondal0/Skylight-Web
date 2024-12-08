import { LockKeyhole } from "lucide-react";

export default function PrivateAccount() {

    return <div className='max-w-[520px] h-dvh
        w-full mx-auto text-center flex flex-col gap-4'>
        <h2 className='text-2xl font-semibold mt-3'>
            This Account is Private
        </h2>
        <p>
            Follow this account to see their posts.
        </p>
        <LockKeyhole className="mx-auto w-14 h-14 my-4"/>
    </div>
}