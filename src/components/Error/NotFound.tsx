'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { logoutApi } from '@/redux/services/account'

export default function NotFound({
  message = "Sorry, this page isn't available."
}: {
  message?: string,
}) {
  const dispatch = useDispatch()
  return (
    <div className='max-w-[520px] 
    w-full mx-auto text-center flex flex-col gap-4'>
      <div>
        <h2 className=' text-2xl font-semibold my-8'>{message ? message : `Sorry, this page isn't available.`}</h2>
        <p className='my-4'>The link you followed may be broken,
          or the page may have been removed.
          Go back to SkyLight Home Page.
        </p>
      </div>
      <Link href='/'
        onClick={() => {
          window.location.replace('/')
        }}
        className='text-blue-500 hover:underline'>
        Go back to Home
      </Link>
      <Button
        onClick={() => {
          signOut()
          dispatch(logoutApi() as any)
        }} className='w-96 mx-auto rounded-xl'
        variant={"destructive"}>
        Logout
      </Button>
    </div>
  )
}

