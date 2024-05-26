import SkyAvatar from "@/components/sky/SkyAvatar"
import { AuthorData, User } from "@/types"
import Link from "next/link"

const ChatUserCard = ({
    user,
    v
}: {
    user: AuthorData | User | null
}) => {
    return (
        <Link href={"/message/12345"}>
            <div className='flex cursor-pointer
            rounded-2xl justify-between p-3 
            transition-colors duration-300 ease-in-out
            hover:bg-accent hover:text-accent-foreground'>
                <div className='flex space-x-2 items-center cursor-pointer' onClick={() => { }}>
                    <SkyAvatar url={user?.profilePicture || "/user.jpg"} className='h-[3.3rem] w-[3.3rem] mx-auto' />
                    <div>
                        <div className='font-semibold text-base'>
                            {user?.username || "User Name"}
                        </div>
                        <div className='text-sm'>
                            {user?.email || "User Email"}
                        </div>
                    </div>
                </div>
                <div className='flex items-center'>
                    {/* 09:00 AM */}
                    {v}
                </div>
            </div>
        </Link>
    )
}

export default ChatUserCard