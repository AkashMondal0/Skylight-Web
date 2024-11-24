import { Comment, NotificationType, Post, disPatchResponse } from "@/types"
import { useSession } from "next-auth/react"
import { memo, useCallback, useContext, useRef } from "react"
import { useDispatch } from "react-redux"
import PostActions from "@/components/PostFeed/PostActions"
import { Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SocketContext } from "@/provider/Socket_Provider"
import { event_name } from "@/configs/socket.event"
import { toast } from "sonner"
import { createPostCommentApi } from "@/redux-stores/slice/post/api.service"
import { createNotificationApi } from "@/redux-stores/slice/notification/api.service"

export const CommentInput = memo(function CommentInput({
    data,
    hideActionButtons = false
}: {
    data: Post,
    hideActionButtons?: boolean
}) {
    const SocketState = useContext(SocketContext)
    const session = useSession().data?.user
    const dispatch = useDispatch()
    const inputRef = useRef<any>(null)
    const loadingRef = useRef(false)


    const handleComment = useCallback(async () => {
        if (!inputRef.current?.value || loadingRef.current) return
        if (!session) return alert("Your not logged in")
        if (!data?.id) return alert("Post not found")
        try {
            loadingRef.current = true
            const commentRes = await dispatch(createPostCommentApi({
                postId: data.id,
                user: {
                    username: session.username,
                    name: session.name,
                    profilePicture: session.image as string,
                    id: session.id,
                    email: session.email
                },
                content: inputRef.current?.value,
                authorId: session.id
            }) as any) as disPatchResponse<Comment>

            if (data.user.id === session.id) return
            if (commentRes.payload.id) {
                // notification
                const notificationRes = await dispatch(createNotificationApi({
                    postId: data.id,
                    commentId: commentRes.payload.id,
                    authorId: session?.id,
                    type: NotificationType.Comment,
                    recipientId: data.user.id
                }) as any) as disPatchResponse<Notification>
                SocketState.sendDataToServer(event_name.notification.post, {
                    ...notificationRes.payload,
                    author: {
                        username: session.username,
                        profilePicture: session.image
                    },
                    post: {
                        id: data.id,
                        fileUrl: data.fileUrl,
                    },
                })
                inputRef.current.value = ""
            } else {
                toast("Something went wrong!")
            }
        } finally {
            loadingRef.current = false
        }
    }, [SocketState, data.fileUrl, data.id, data.user.id, session])

    return (<div className='w-full bg-background border-t sticky bottom-0'>
        {hideActionButtons ? <></> : <PostActions post={data} onNavigate={() => { }} />}
        <div className='w-auto h-auto rounded-2xl gap-1 bg-background flex items-center mt-2 p-2'>
            <div> <Smile className="w-6 h-6" /></div>
            <input type="text"
                placeholder='Add a comment'
                multiple
                ref={inputRef}
                className='w-full h-12 p-4 outline-none rounded-2xl border' />
            <Button variant={"default"} onClick={handleComment}
                className='w-full h-12 flex-1 rounded-2xl'>Post</Button>
        </div>
    </div>)
}, ((preProps, nextProps) => {
    return preProps.data.id === nextProps.data.id
}))
