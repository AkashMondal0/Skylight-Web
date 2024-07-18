'use client';
import React, { useCallback } from 'react'
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeAllUserFormSearch } from '@/redux/slice/users';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SkeletonUserCard } from '@/components/home/loading/UserCard';
import SkyAvatar from '@/components/sky/SkyAvatar';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { MessagesSquare } from 'lucide-react';



const FindUserForChat = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const inputRef = React.useRef<any>();
    const searchResultUser = useSelector((state: RootState) => state.users);


    const handleSearch = useCallback(() => {
        if (inputRef?.current?.value) {
            // dispatch(searchProfileApi({ keywords: inputRef?.current?.value }) as any)
        }
    }, []);

    const debouncedHandleSearch = useCallback(debounce(handleSearch, 1000), []);


    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            dispatch(removeAllUserFormSearch() as any)
        }
    }

    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="p-0 max-h-none flex flex-col">
                <div className='w-full flex justify-center h-full'>
                    <div className='max-w-[600px] w-full p-4'>
                        <h1 className="font-semibold text-lg text-center mb-4">New message</h1>
                        <Separator />
                        <div className={`w-full p-2 px-4 border bg-secondary my-4 flex items-center gap-3
                    text-secondary-foreground rounded-xl focus:outline-none focus:ring-0`}>
                            <p className='font-semibold'>To:</p>  <input type="text" placeholder='Search'
                                ref={inputRef}
                                onChange={debouncedHandleSearch}
                                className='w-full bg-transparent focus:outline-none focus:ring-0' />
                        </div>
                        <Separator />
                        <div className='h-5' />
                        <ScrollArea className='flex-1 h-96'>
                            {/* {searchResultUser.loading ?
                                <div className='space-y-4'>
                                    {Array(10).fill(0).map((_, i) => <SkeletonUserCard key={i} />)}
                                </div> :
                                searchResultUser.search_users.map((item, i) => <UserCard key={i} item={item} />)} */}
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FindUserForChat


const UserCard = ({
    item
}: {
    item: User
}) => {

    const dispatch = useDispatch();
    const router = useRouter()

    const removeUser = useCallback(() => {
        // dispatch(removeUserFormSearch(item.id) as any)
    }, []);

    const navigate = () => {
        router.push(`/message/${item.id}`)
    };

    return (
        <DialogClose onClick={navigate} className='w-full h-full'>
            <div className='flex justify-between p-2 hover:bg-secondary hover:text-secondary-foreground rounded-2xl my-1 cursor-pointer'>
                <div className='flex space-x-2 items-center'>
                    <SkyAvatar className='h-12 w-12 mx-auto' url={item.profilePicture ? item.profilePicture : "/user.jpg"} />
                    <div className='ml-2 text-start'>
                        <div className='font-semibold text-base'>
                            {item.name}
                        </div>
                        <div className='text-sm'>
                            {item.username}
                        </div>
                    </div>
                </div>
                <div className='flex items-center cursor-pointer' onClick={removeUser}>
                    <MessagesSquare />
                </div>
            </div>
        </DialogClose>
    )
}