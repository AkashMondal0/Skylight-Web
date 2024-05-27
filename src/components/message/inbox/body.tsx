"use client"
import { useRef } from 'react';
import MessagesCard from './message_card';
import { Virtuoso } from 'react-virtuoso';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Conversation } from '@/types';
import { useSession } from 'next-auth/react';



const InBoxBody = ({ data }: { data: Conversation }) => {

    const session = useSession().data?.user
    const prnt = useRef(null)
    // const loadMore = () => {
    //     const message = Array.from({ length: 20 }, (_, i) => {
    //         return {
    //             id: `${i}`,
    //             content: `Hello x${i}`,
    //         }
    //     }).reverse()
    //     setMessages([...message, ...messages])
    //     //@ts-ignore
    //     prnt?.current?.scrollToIndex({ index: 20 })
    // }

    return (
        <>
            <div className='h-full w-full flex-1' id='style-1'>
                <Virtuoso
                    ref={prnt}
                    className='h-full w-full'
                    data={data.messages}
                    // startReached={loadMore}
                    initialTopMostItemIndex={data.messages.length - 1}
                    increaseViewportBy={1000}
                    itemContent={(index, post) => {
                        return <MessagesCard
                            data={data.messages[index]}
                            seen={false}
                            isProfile={session?.id === data.messages[index].authorId}
                        />
                    }}
                    components={{
                        Header: () => <div className='flex justify-center my-2'>
                            {/* <Button onClick={loadMore}>Load More</Button> */}
                        </div>,
                    }} />
                <style>{`html, body, #root { height: 100% }`}</style>
            </div >
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