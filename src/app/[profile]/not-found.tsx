import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='max-w-[520px] w-full mx-auto text-center '>
      <h2 className=' text-2xl font-semibold my-8'>{`Sorry, this page isn't available.`}</h2>
      <p className='my-4'>The link you followed may be broken,
        or the page may have been removed.
        Go back to Skymedia.
      </p>
      <Link href="/" className='text-blue-500'>Return Home</Link>
    </div>
  )
}