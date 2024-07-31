'use client'
import Link from 'next/link'

export default function NotFound({
  message = "Sorry, this page isn't available."
}: {
  message?: string,
}) {
  return (
    <div className='max-w-[520px] w-full mx-auto text-center '>
      <h2 className=' text-2xl font-semibold my-8'>{message ? message : `Sorry, this page isn't available.`}</h2>
      <p className='my-4'>The link you followed may be broken,
        or the page may have been removed.
        Go back to SkyLight Home Page.
      </p>
      <Link href='/'
        onClick={() => {
          window.location.replace('/')
        }}
        className='text-blue-500 hover:underline'>
        Go back to Home
      </Link>
    </div>
  )
}

