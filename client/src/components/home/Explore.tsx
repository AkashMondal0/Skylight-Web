import Link from 'next/link'
import React from 'react'
import { getServerSession } from "next-auth/next"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ExploreUserCard from './Card/ExploreCard'


export default async function Page() {
    const session = await getServerSession()

    if (!session?.user) return null

    return (
        <div className='my-4 space-y-4'>
            <MyAccount user={session.user} />
            <div className='flex justify-between px-2 max-w-sm w-72'>
                <div className='font-semibold text-sm'>Suggestion for you</div>
                <Link href={"/explore/people"} className='font-semibold text-xs hover:opacity-50 cursor-pointer'>See All</Link>
            </div>
            <div className='space-y-3'>
                {[...Array(5)].map((_, i) => <ExploreUserCard key={i} />)}
            </div>
        </div>
    )
}


const MyAccount = ({
    user: {
        name = "Error",
        image = "/user.jpg",
        email = "Error",
    }
}: {
    user: {
        name?: string | null
        image?: string | null
        email?: string | null
    }
}) => {
    return <div>
        <div className='flex justify-between px-2 max-w-sm w-72'>
            <div className='flex space-x-2 items-center'>
                <Avatar className='h-10 w-10 mx-auto'>
                    <AvatarImage src={image || "/user.jpg"}
                        alt="@shadcn" className='rounded-full' />
                </Avatar>
                <div>
                    <div className='font-semibold text-base'>{email}</div>
                    <div className='text-sm'>
                        {name}
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <Link href={"/explore/people"} className='text-sm text-blue-500 hover:text-white cursor-pointer hover:opacity-90'>
                    Switch
                </Link>
            </div>
        </div>
    </div>
}


