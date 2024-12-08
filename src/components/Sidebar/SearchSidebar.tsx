/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from '@/lib/utils';
import React, { memo, useCallback, useEffect } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Cancel } from '../sky/icons';
import { LoadingUserCardWithButton } from '../loading/Card';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import SkyAvatar from '../sky/SkyAvatar';
import { X } from 'lucide-react';
import { AuthorData } from '@/types';
import { RootState } from '@/redux-stores/store';
import { searchUsersProfileApi } from '@/redux-stores/slice/users/api.service';
import { removeAllUserFormSearch } from '@/redux-stores/slice/users';


const SearchSidebar = ({
    open,
    close
}: {
    open: boolean
    close: () => void
}) => {
    const inputRef = React.useRef<any>("");
    const Users = useSelector((Root: RootState) => Root.UsersState);
    const dispatch = useDispatch()

    const handleSearch = useCallback(() => {
        if (inputRef?.current?.value) {
            dispatch(searchUsersProfileApi(inputRef?.current?.value) as any)
        }
    }, []);

    const debouncedHandleSearch = useCallback(debounce(handleSearch, 1000), []);

    const clearAll = useCallback(() => {
        dispatch(removeAllUserFormSearch() as any)
    }, []);

    useEffect(() => {
        inputRef.current?.focus()
    }, [open])

    return (
        <div>
            <div className={cn(`flex absolute z-50 w-auto h-dvh`)}>
                <div className={cn(`flex flex-col flex-none bg-background text-foreground
                 duration-300 ease-in-out transition-all z-50`,
                    open ? 'w-96 border-x' : 'w-0')}>
                    <div className={cn('overflow-y-auto scroll-smooth hideScrollbar',
                        open ? 'block' : 'hidden')}>
                        <div className='w-full mb-4 p-2 pt-4 flex justify-between'>
                            <h2 className='text-2xl font-semibold'>Search</h2>
                            <Button onClick={close}
                                variant={"outline"}
                                className='rounded-full px-2'>
                                {Cancel()}
                            </Button>
                        </div>
                        <div className='w-full space-y-4 px-2'>
                            <div className={`w-full p-2 px-4 border bg-secondary my-4 text-secondary-foreground rounded-xl focus:outline-none focus:ring-0`}>
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
                        <div className='w-full pt-4 h-full min-h-dvh px-1'>
                            {Users.searchUsersLoading ?
                                <div className='space-y-4'>
                                    {Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}
                                </div> :
                                Users.searchUsers?.map((item, i) => <UserCard key={i} item={item} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchSidebar;

const UserCard = memo(function UserCard({
    item
}: {
    item: AuthorData
}) {

    const dispatch = useDispatch();
    const router = useRouter()

    const removeUser = useCallback(() => {
        // dispatch(removeUserByIdFormSearch(item.id) as any)
    }, []);

    const navigateToProfile = useCallback(() => {
        router.push(`/${item.username}`)
    }, []);

    return (
        <div className='flex justify-between p-2 hover:bg-secondary hover:text-secondary-foreground rounded-2xl my-1 cursor-pointer'
            onClick={navigateToProfile}>
            <div className='flex space-x-2 items-center'>
                <SkyAvatar className='h-12 w-12 mx-auto' url={item.profilePicture} />
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
                <X />
            </div>
        </div>
    )
}, (prevProps, nextProps) => {
    return prevProps.item.id === nextProps.item.id
})