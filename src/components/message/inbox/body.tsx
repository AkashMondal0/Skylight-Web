
"use client"
import { AuthorData, Dm } from '@/types';
import { FC } from 'react';
import MessagesCard from './message_card';


interface InBoxBodyProps {
}

const InBoxBody: FC<InBoxBodyProps> = ({

}) => {

    return (
        <>
            <div className='flex-1 overflow-y-auto px-2' id='style-1'>
                {Array(10).fill(0).map((item, index) => {
                    // const seen = item.seenBy.includes(profile._id) && item.seenBy.length >= 2
                    // if (item.fileUrl) {
                    //     return <FileComponent
                    //         key={index}
                    //         seen={seen}
                    //         data={item}
                    //         profile={profile} />
                    // }
                    return <MessagesCard
                        key={index}
                        data={item}
                        seen={true}
                        isProfile={true}
                    />
                })}
            </div>
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