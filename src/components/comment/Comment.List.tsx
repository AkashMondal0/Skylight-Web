import { memo, useEffect, useRef } from "react"
import { ScrollArea } from "../ui/scroll-area"
import { Post } from "@/types"
import SkyAvatar from "@/components/sky/SkyAvatar"
import { timeAgoFormat } from "@/lib/timeFormat"
import { fetchPostCommentsApi } from "@/redux/services/post"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { CommentListLoading } from "../loading/Message.page"
let previousPostId = "noPost"
export const CommentList = memo(function CommentList({ data }: { data: Post }) {
    const dispatch = useDispatch()
    const loadedRef = useRef(false)
    const comments = useSelector((Root: RootState) => Root.posts.viewPost?.comments)
    const loading = useSelector((Root: RootState) => Root.posts.fetchPostCommentsLoading)

    useEffect(() => {
        if (previousPostId !== data.id) {
            dispatch(fetchPostCommentsApi({
                id: data.id,
                offset: 0,
                limit: 12
            }) as any)
            previousPostId = data.id
            loadedRef.current = true
        }
    }, []);

    return (
        <ScrollArea className='h-auto flex-1 scrollbarStyle'>
            <div className="flex p-4 border-b">
                <SkyAvatar url={data?.user?.profilePicture || "/user.jpg"} className='h-12 w-12 ' />
                <div className="flex flex-col ml-4">
                    <p className="break-all"><span className='font-semibold text-lg'>
                        {data?.user?.username}</span> {data?.content}
                    </p>
                    <div className="text-sm text-gray-500">{timeAgoFormat(data.createdAt)}</div>
                </div>
            </div>
            {loading ? <CommentListLoading /> :
                comments?.length === 0 ?
                    <div className='flex justify-center items-center h-96'>
                        <div>
                            <p className='font-bold text-2xl text-center'>No comments yet</p>
                            <p className='text-center'>Start the conversation.</p>
                        </div>
                    </div> :
                    <>
                        {comments?.map((comment, index) => (
                            <div key={index} className="flex p-4 my-auto">
                                <SkyAvatar url={comment?.user?.profilePicture || "/user.jpg"} className='h-12 w-12 ' />
                                <div className="flex flex-col ml-4">
                                    <p className="break-all text-base font-light">
                                        <span className='font-semibold text-lg mr-2'>
                                            {comment?.user?.username}
                                        </span>
                                        {comment?.content}
                                    </p>
                                    <div className="text-sm text-gray-500">{timeAgoFormat(comment.createdAt)}</div>
                                </div>
                            </div>
                        ))}
                    </>
            }
            <div className="h-96" />
        </ScrollArea>
    )
}, ((preProps, nextProps) => {
    return true
}))