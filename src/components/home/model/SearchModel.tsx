'use client';
import React, { useCallback } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose
} from "@/components/ui/drawer"
import { X } from 'lucide-react'
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import SkyAvatar from '@/components/sky/SkyAvatar';
import { searchUsersProfileApi } from '@/redux/services/users';
import { removeAllUserFormSearch, removeUserByIdFormSearch } from '@/redux/slice/users';
import { SkeletonUserCardWithButton } from '../loading/UserCard';



const SearchModel = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const inputRef = React.useRef<any>("");
    const Users = useSelector((Root: RootState)=> Root.users);

    const handleSearch = useCallback(() => {
        if (inputRef?.current?.value) {
            dispatch(searchUsersProfileApi(inputRef?.current?.value) as any)
        }
    }, []);

    const debouncedHandleSearch = useCallback(debounce(handleSearch, 1000), []);

    const clearAll = useCallback(() => {
        dispatch(removeAllUserFormSearch() as any)
    }, []);

    return (
        <Drawer direction="left">
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='w-96 h-[100dvh] overflow-y-auto p-4'>
                <div className='w-full space-y-4 py-4 mb-4'>
                    <h2 className='text-2xl font-semibold'>Search</h2>
                    <div className={`w-full p-2 px-4 border bg-secondary my-4
                    text-secondary-foreground rounded-xl focus:outline-none focus:ring-0`}>
                        <input type="text" placeholder='Search'
                            ref={inputRef}
                            onChange={debouncedHandleSearch}
                            className='w-full bg-transparent focus:outline-none focus:ring-0' />
                    </div>
                </div>
                <div className='flex justify-between m-2'>
                    <div className='font-semibold'>Recent</div>
                    <div className='text-primary text-blue-00 cursor-pointer' onClick={clearAll}>Clear All</div>
                </div>
                {Users.searchUsersLoading ?
                    <div className='space-y-4'>
                    {Array(10).fill(0).map((_, i) => <SkeletonUserCardWithButton key={i} />)}
                    </div> :
                    Users.searchUsers?.map((item, i) => <UserCard key={i} item={item} />)}
            </DrawerContent>
        </Drawer>
    )
}

export default SearchModel


const UserCard = ({
    item
}: {
    item: User
}) => {

    const dispatch = useDispatch();
    const router = useRouter()

    const removeUser = useCallback(() => {
        dispatch(removeUserByIdFormSearch(item.id) as any)
    }, []);

    const navigateToProfile = useCallback(() => {
        router.push(`/${item.username}`)
    }, []);

    return (
        <div className='flex justify-between p-2 hover:bg-secondary hover:text-secondary-foreground rounded-2xl my-1 cursor-pointer'
            onClick={navigateToProfile}>
            <DrawerClose>
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
            </DrawerClose>
            <div className='flex items-center cursor-pointer' onClick={removeUser}>
                <X />
            </div>
        </div>
    )
}