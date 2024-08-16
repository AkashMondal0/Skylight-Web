'use client';
import React, { useCallback } from 'react'
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeAllUserFormSearch } from '@/redux/slice/users';
import { DialogClose } from '@/components/ui/dialog'
import SkyAvatar from '@/components/sky/SkyAvatar';
import { AuthorData, Conversation, disPatchResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { MessagesSquare } from 'lucide-react';
import { searchUsersProfileApi } from '@/redux/services/users';
import { LoadingUserCardWithButton } from '@/components/loading/Card';
import { TempleDialog } from '@/components/Dialog/Temple.Dialog';
import { CreateConversationApi } from '@/redux/services/conversation';
import { toast } from 'sonner';



const UserToMessage = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const inputRef = React.useRef<any>();
    const Users = useSelector((Root: RootState) => Root.users);

    const handleSearch = useCallback(() => {
        if (inputRef?.current?.value) {
            dispatch(searchUsersProfileApi(inputRef?.current?.value) as any)
        }
    }, []);

    const debouncedHandleSearch = useCallback(debounce(handleSearch, 1000), []);

    const clearAll = useCallback(() => {
        dispatch(removeAllUserFormSearch() as any)
    }, []);

    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            dispatch(removeAllUserFormSearch() as any)
        }
    }

    return (
        <TempleDialog
            onOpenChange={onOpenChange}
            headerTitle='New Message'
            header={<div className={`p-2 border bg-secondary my-4 flex items-center gap-3
            text-secondary-foreground rounded-xl focus:outline-none focus:ring-0 mx-4`}>
                <p className='font-semibold'>To:</p>
                <input type="text" placeholder='Search'
                    ref={inputRef}
                    onChange={debouncedHandleSearch}
                    className='bg-transparent focus:outline-none focus:ring-0' />
            </div>}
            TriggerChildren={children}>
            <div>
                {Users.searchUsersLoading ?
                    Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)
                    :
                    Users.searchUsers.map((item, i) => <UserCard key={i} item={item} />)}
            </div>
        </TempleDialog>
    )
}

export default UserToMessage


const UserCard = ({
    item
}: {
    item: AuthorData
}) => {
    const dispatch = useDispatch();
    const router = useRouter()
    const navigate = async () => {
        const res = await dispatch(CreateConversationApi([item.id]) as any) as disPatchResponse<Conversation>
        if (res.error) return toast("Something went wrong")
        router.push(`/message/${res.payload.id}`)
    }

    const removeUser = useCallback(() => {
        // dispatch(removeUserFormSearch(item.id) as any)
    }, []);
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
                <div className='flex items-center cursor-pointer pr-2' onClick={removeUser}>
                    <MessagesSquare />
                </div>
            </div>
        </DialogClose>
    )
}