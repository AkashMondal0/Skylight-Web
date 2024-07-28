'use client';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon, Paperclip, Send } from 'lucide-react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux'
import { Assets, Conversation } from '@/types';
import { useSession } from 'next-auth/react';
import { CreateMessageApi } from '@/redux/services/conversation';
import { SocketContext } from '@/provider/Socket_Provider';
import { event_name } from '@/configs/socket.event';

const schema = z.object({
    message: z.string().min(1)
})
export const MessageInput = ({ data }: { data: Conversation }) => {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const [assets, setAssets] = useState<Assets[]>([])
    const [loading, setLoading] = useState(false)
    const socketState = useContext(SocketContext)
    const members = useMemo(() => {
        return data.members?.filter((i) => i !== session?.id) ?? []
    }, [data.members])
    const stopTypingRef = useRef(true)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            message: "",
        }
    });

    const typingSetter = (typing: boolean) => {
        if (session?.id && data.id) {
            // console.log("typing")
            socketState.socket?.emit(event_name.conversation.typing, {
                typing: typing,
                authorId: session?.id,
                members: members,
                conversationId: data.id,
                isGroup: data.isGroup ?? false
            })
        }
    }

    const onBlurTyping = useCallback(debounce(() => {
        stopTypingRef.current = true
        typingSetter(false)
    }, 2500), []);

    const onTyping = useCallback(() => {
        if (stopTypingRef.current) {
            typingSetter(true)
            stopTypingRef.current = false
        }
        onBlurTyping()
    }, []);

    const sendMessageHandle = async (_data: { message: string }) => {
        setLoading(true)
        if (!session?.id) return
        if (!data.id) return
        const newMessage = await dispatch(CreateMessageApi({
            conversationId: data.id,
            authorId: session?.id,
            content: _data.message,
            fileUrl: [],
            members: members,
        }) as any)
        if (newMessage?.payload?.id) {
            socketState.socket?.emit(event_name.conversation.message, {
                ...newMessage.payload, members: members ?? []
            })
        }
        reset()
        setAssets([])
        setLoading(false)
    }

    const onChangeFile = useCallback((e: any) => {
        const files = e.target.files
        if (files.length > 0) {
            const _assets = Array.from(files).map((file: any) => {
                return {
                    _id: new Date().getTime().toString(),
                    url: file,
                    type: file.type.split('/')[0],
                }
            })
            setAssets(_assets)
        }
    }, [])

    return (
        <>
            {/* <UploadFileComponent assets={assets} /> */}
            <div className={`w-full border-t items-center
             h-auto my-auto max-h-20 flex gap-1 sticky py-2 px-1
             bottom-0 z-50 bg-background`}>
                {/* <DropDownMenu data={dropdownData}> */}
                <Button type="submit"
                    variant={"outline"}
                    className='rounded-3xl p-0 w-12'>
                    <Paperclip />
                </Button>
                {/* </DropDownMenu> */}
                <input
                    type="file"
                    accept="image/*, video/*, audio/*"
                    multiple
                    name="file"
                    id="files"
                    className='hidden'
                    onChange={(e) => { onChangeFile(e) }} />
                <form onSubmit={handleSubmit(sendMessageHandle)}
                    className="flex w-full items-center dark:bg-neutral-900
                bg-neutral-200 dark:text-neutral-100 text-neutral-800 rounded-3xl">
                    <input id='message-input' className='outline-none focus:none 
                    bg-transparent w-full p-2 dark:placeholder-neutral-100
                     placeholder-neutral-800' type="text" placeholder="Send a message"
                        {...register("message", {
                            required: true,
                            onChange: onTyping,
                        })}
                    />
                </form>
                <Button type="submit"
                    disabled={loading}
                    onClick={handleSubmit(sendMessageHandle)}
                    variant={"outline"}
                    className='rounded-3xl h-10 px-3'>
                    {loading ? <Loader2Icon className='animate-spin' /> : <Send />}
                </Button>
            </div>
        </>
    );
};
