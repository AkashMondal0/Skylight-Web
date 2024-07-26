import { FC, useMemo } from 'react';
import { CheckCheck } from 'lucide-react';
import { AuthorData, Message } from '@/types';
interface MessagesCardProps {
    data: Message
    profile?: AuthorData
    isReply?: boolean
    seen?: boolean
    isProfile?: boolean
}
const MessagesCard: FC<MessagesCardProps> = ({
    data,
    isProfile
}) => {
    const message = useMemo(() => {
        return {
            content: data.content,
            isProfile: isProfile
        }
    }, [])

    return (
        <div className={`my-3 flex items-center mx-2 ${message.isProfile ? "justify-end" : " justify-start"}`}>
            <div className={`px-4 py-1 rounded-2xl border 
             ${isProfile ? "bg-primary/90 text-primary-foreground ml-8" : "bg-accent mr-8"}`}>
                <div className=''>
                    <p className='break-all'>{message?.content}</p>
                    <div className='flex gap-1 justify-end'>
                        <div className={`text-sm text-gray-500 ${!isProfile ? "prl-8" : "pr-8"}`}>
                            {new Date(data.createdAt as Date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        </div>
                        {message.isProfile ? <div className='text-sm text-gray-500'>
                            <CheckCheck size={20} className={false ? 'text-sky-400' : ""} />
                        </div> : null}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MessagesCard;