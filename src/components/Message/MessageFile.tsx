import React from 'react'
import OptimizedImage from '../sky/SkyImage'
import { Message } from '@/types'
import { CheckCheck } from 'lucide-react'

const MessageFile = ({
  data,
  isProfile,
  seen
}: {
  data: Message,
  isProfile?: boolean
  seen?: boolean
}) => {

  return <div>
    {data?.fileUrl?.map((asset, index) => {
      if (asset.includes("jpeg")) {
        return <div
          key={index}
          className={`p-1 my-1 rounded-2xl border ${isProfile ? "bg-primary/90 text-primary-foreground" : "bg-accent"}`}>
          <div className='flex justify-end items-end'>
            <OptimizedImage
              key={index}
              className='max-h-96 w-72 object-cover rounded-xl'
              src={asset} alt="image" width={100} height={100} />
            <div className='flex justify-end gap-2 mt-[2px] w-0 shadow-2xl'>
              <div className='w-max flex px-1'>
                <div className={`text-sm text-white w-max`}>
                  {new Date(data.createdAt as Date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                </div>
                {isProfile ? <div className='text-sm text-white'>
                  <CheckCheck size={20} className={seen ? 'text-sky-400' : ""} />
                </div> : null}
              </div>
            </div>
            {/* <p className='break-all'>{data.content}</p> */}
          </div>
        </div>
      }
      // if (asset) {
      //   return <video src={asset.url} controls key={index} className={`object-cover h-60 w-48 rounded-3xl mb-2`} />
      // }
      // if (asset) {
      //   return <audio key={index} src={asset.url} controls className={`object-cover h-60 w-48 rounded-3xl mb-2`} />
      // }
      return <></>
    })}
  </div>
}

export default MessageFile