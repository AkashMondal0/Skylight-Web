import SkyAvatar from "@/components/sky/SkyAvatar"
import { AuthorData, User } from "@/types"


const ChatUserCard = ({
    user,
}: {
    user: AuthorData | User | null
}) => {
    return (
        <>
            <div className='flex justify-between my-4'>
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
                </div>
            </div>
        </>
    )
}

export default ChatUserCard