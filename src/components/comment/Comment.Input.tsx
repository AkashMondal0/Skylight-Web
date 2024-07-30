import { createPostCommentApi } from "@/redux/services/post"
import { Post } from "@/types"
import { useSession } from "next-auth/react"
import { memo, useRef } from "react"
import { useDispatch } from "react-redux"
import PostActions from "@/components/PostFeed/PostActions"
import { Smile } from "lucide-react"
import { Button } from "@/components/ui/button"

export const CommentInput = memo(function CommentInput({
    data,
    hideActionButtons = false
}: {
    data: Post,
    hideActionButtons?: boolean
}) {
    const session = useSession().data?.user
    const dispatch = useDispatch()
    const inputRef = useRef<any>(null)


    const handleComment = async (inputValue: string) => {
        if (!session) return alert("session undefine")
        if (!data?.id) return alert("Post.viewPost.id undefine")
        await dispatch(createPostCommentApi({
            postId: data.id,
            user: {
                username: session.username,
                name: session.name,
                profilePicture: session.image as string,
                id: session.id,
                email: session.email
            },
            content: inputValue,
            authorId: session.id
        }) as any)
    }

    return (<div className='w-full bg-background border-t sticky bottom-0'>
        {hideActionButtons ? <></> : <PostActions post={data} onNavigate={() => { }} />}
        <div className='w-auto h-auto rounded-2xl gap-1 bg-background flex items-center mt-2 p-2'>
            <div> <Smile className="w-6 h-6" /></div>
            <input type="text"
                placeholder='Add a comment'
                multiple
                ref={inputRef}
                className='w-full h-12 p-4 outline-none rounded-2xl border' />
            <Button variant={"default"} onClick={() => {
                if (inputRef.current?.value) {
                    handleComment(inputRef.current?.value)
                    // @ts-ignore
                    inputRef.current.value = "";
                }
            }} className='w-full h-12 flex-1 rounded-2xl'>Post</Button>
        </div>
    </div>)
}, ((preProps, nextProps) => {
    return preProps.data.comments.length === nextProps.data.comments.length
}))
