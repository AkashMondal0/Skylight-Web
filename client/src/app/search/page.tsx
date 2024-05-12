/* eslint-disable react-hooks/exhaustive-deps */

'use client';
import React, { useCallback } from 'react'
import { X } from 'lucide-react'
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { searchProfileApi } from '@/redux/slice/users/api-functions';
import { RootState } from '@/redux/store';
import { User } from '@/types';
import { removeAllUserFormSearch, removeUserFormSearch } from '@/redux/slice/users';
import { useRouter } from 'next/navigation';
import { SkeletonUserCard } from '@/components/home/loading/UserCard';
import SkyAvatar from '@/components/sky/SkyAvatar';

const SearchModel = () => {
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
    <>
      <div className='w-full h-[100dvh] overflow-y-auto p-4'>
        <div className='w-full space-y-4'>
          <div className={`w-full p-2 px-4 border bg-secondary
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
        {searchResultUser.loading ?
          <div className='space-y-4'>{
            Array(10).fill(0).map((_, i) => <SkeletonUserCard key={i} />)}</div> :
          searchResultUser.search_users.map((item, i) => <UserCard key={i} item={item} />)}
      </div>
    </>
  )
}


const UserCard = ({
  item
}: {
  item: User
}) => {

  const dispatch = useDispatch();
  const router = useRouter()

  const removeUser = useCallback(() => {
    dispatch(removeUserFormSearch(item.id) as any)
  }, []);

  const navigateToProfile = useCallback(() => {
    router.push(`/${item.username}`)
  }, []);

  return (
    <>
      <div className='flex justify-between p-2  cursor-pointer
      hover:bg-secondary hover:text-secondary-foreground rounded-2xl my-1'>
        <div className='flex space-x-2 items-center' onClick={navigateToProfile}>
          {/* <Avatar className='h-12 w-12 mx-auto'>
            <AvatarImage src={item.profilePicture ? item.profilePicture : "/user.jpg"}
              alt="@shadcn" className='rounded-full' />
          </Avatar> */}
          <SkyAvatar url={item.profilePicture ? item.profilePicture : "/user.jpg"} className='h-12 w-12 mx-auto' />
          <div className='ml-2'>
            <div className='font-semibold text-base text-start'>{item.username}</div>
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

export default SearchModel