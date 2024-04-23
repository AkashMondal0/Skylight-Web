/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useCallback } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { X } from 'lucide-react'
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { searchProfileApi } from '@/redux/slice/users/api-functions';
import { RootState } from '@/redux/store';
import { User } from '@/types';
import { removeAllUserFormSearch, removeUserFormSearch } from '@/redux/slice/users';



const SearchModel = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const inputRef = React.useRef<any>();
    const searchResultUser = useSelector((state: RootState) => state.users);

    const handleSearch = useCallback(() => {
        if (inputRef?.current?.value) {
            dispatch(searchProfileApi({ keywords: inputRef?.current?.value }) as any)
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
                {searchResultUser.search_users.map((item, i) => <UserCard key={i} item={item} />)}
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

    const removeUser = useCallback(() => {
        dispatch(removeUserFormSearch(item.id) as any)
    }, []);

    return (
        <>
            <div className='flex justify-between p-2 hover:bg-secondary hover:text-secondary-foreground rounded-2xl my-1'>
                <div className='flex space-x-2 items-center'>
                    <Avatar className='h-12 w-12 mx-auto'>
                        <AvatarImage src={item.profilePicture ? item.profilePicture : "https://github.com/shadcn.png"}
                            alt="@shadcn" className='rounded-full' />
                    </Avatar>
                    <div>
                        <div className='font-semibold text-base'>{item.username}</div>
                        <div className='text-sm'>
                            {item.email}
                        </div>
                    </div>
                </div>
                <div className='flex items-center cursor-pointer' onClick={removeUser}>
                    <X />
                </div>
            </div>
        </>
    )
}