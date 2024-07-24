/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2Icon, Paperclip, Send } from 'lucide-react'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation';
import { Assets, Conversation } from '@/types';
import { useSession } from 'next-auth/react';
import { CreateMessageApi } from '@/redux/services/conversation';


const schema = z.object({
    message: z.string().min(1)
})
const InBoxFooter = ({ data }: { data: Conversation }) => {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const router = useRouter()
    const [stopTyping, setStopTyping] = useState(true)
    const [assets, setAssets] = useState<Assets[]>([])
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            message: "",
        }
    });

    const onFocus = useCallback(() => {
        // emit socket io typing event
    }, [])

    const onBlurType = useCallback(() => {
        // emit socket io stop typing event
    }, [])

    const debouncedHandleOnblur = useCallback(debounce(onBlurType, 2000), []);


    const sendMessageHandle = async (_data: { message: string }) => {
        setLoading(true)
        // create message with new conversation
        if (!session?.id) return

        if (!data.id) return
        await dispatch(CreateMessageApi({
            conversationId: data.id,
            authorId: session?.id,
            content: _data.message,
            fileUrl: []
        }) as any)
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
            <div className={cn("w-full border-t items-center p-2 h-16 my-auto max-h-20 flex gap-2")}>
                {/* <DropDownMenu data={dropdownData}> */}
                <Button type="submit"
                    variant={"outline"} className='rounded-3xl'>
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
                    onChange={(e) => { onChangeFile(e) }}
                />
                <form onSubmit={handleSubmit(sendMessageHandle)} className="flex w-full items-center dark:bg-neutral-900
                bg-neutral-200 dark:text-neutral-100 text-neutral-800 rounded-3xl">
                    <input
                        id='message-input'
                        className='outline-none focus:none bg-transparent w-full p-2
                    dark:placeholder-neutral-100 placeholder-neutral-800'
                        type="text" placeholder="send a message"

                        {...register("message", {
                            required: true,
                            onChange(e) {
                                if (stopTyping) {
                                    onFocus()
                                    setStopTyping(false)
                                }
                                else {
                                    debouncedHandleOnblur()
                                }
                                if (e.target.value === "") {
                                    debouncedHandleOnblur()
                                }
                            },
                        })}
                    />
                </form>
                <Button type="submit"
                    disabled={loading}
                    onClick={handleSubmit(sendMessageHandle)}
                    variant={"outline"} className='rounded-3xl'>
                    {loading ? <Loader2Icon className='animate-spin' /> : <Send />}
                </Button>
            </div>
        </>
    );
};

export default InBoxFooter;