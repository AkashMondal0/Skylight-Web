"use client"
// import { memo, useEffect, useMemo, useRef } from 'react';
// import MessagesCard from './message_card';
// import React from 'react';
// import { Conversation } from '@/types';
// import { useSession } from 'next-auth/react';
// import { ScrollArea } from '@/components/ui/scroll-area';
// const MemorizeMessagesCard = memo(MessagesCard)


const InBoxBody = () => {
    // const session = useSession().data?.user
    // const messages = useMemo(() => {
    //     return data.messages
    // }, [data.messages])

    return (
        <>
           
        </>
    );

};

export default InBoxBody;


// const FileComponent = ({
//     data,
//     seen,
//     profile,
//     isProfile
// }: {
//     data: Dm,
//     seen: boolean,
//     profile: AuthorData
//     isProfile?: boolean
// }) => {
//     return <div className={`my-3 flex items-center ${isProfile ? "justify-end" : " justify-start"}`}>
//         <div className=''>
//             {
//                 data?.fileUrl?.map((asset, index) => {
//                     if (asset.type === "image") {
//                         return <div key={index}>
//                             <img key={index} src={asset.url} alt="" className={`object-cover h-60 w-48 rounded-3xl mb-2`} />
//                         </div>
//                     }
//                     if (asset.type === "video") {
//                         return <video src={asset.url} controls key={index} className={`object-cover h-60 w-48 rounded-3xl mb-2`} />
//                     }
//                     if (asset.type === "audio") {
//                         return <audio key={index} src={asset.url} controls className={`object-cover h-60 w-48 rounded-3xl mb-2`} />
//                     }
//                     return <div key={index} className='bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 p-2 rounded-3xl'>
//                         {asset.caption}
//                     </div>
//                 })
//             }
//         </div>
//     </div>
// }