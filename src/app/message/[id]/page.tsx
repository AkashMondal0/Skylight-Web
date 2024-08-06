"use client"
import { RootState } from "@/redux/store"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotFound from "@/components/Error/NotFound";
import { fetchConversationAllMessagesApi, fetchConversationApi } from "@/redux/services/conversation";
import { MessageHeader } from "@/components/Message/MessageHeader";
import { MessageInput } from "@/components/Message/MessageInput";
import { MessagePageSkeleton } from "@/components/loading/Message.page";
import VirtualizeMessageList from "@/components/Message/VirtualMessageList";
let pageLoaded = false

export default function Page({ params }: { params: { id: string } }) {
  const rootConversation = useSelector((Root: RootState) => Root.conversation)
  const dispatch = useDispatch()

  const fetch = useCallback(async () => {
    await dispatch(fetchConversationApi(params.id) as any)
    await dispatch(fetchConversationAllMessagesApi(params.id) as any)
    pageLoaded = true
  }, [])

  useEffect(() => {
    if (!pageLoaded || params.id !== rootConversation.conversation?.id) {
      fetch()
    }
  }, [params.id])

  if (rootConversation.messageLoading || !pageLoaded) {
    return <MessagePageSkeleton />
  }

  if (pageLoaded && rootConversation.messageError || !rootConversation.conversation) {
    return <NotFound />
  }

  return (
    <div className='w-full flex flex-col'>
      <MessageHeader data={rootConversation.conversation} />
      <VirtualizeMessageList conversation={rootConversation.conversation} />
      <MessageInput data={rootConversation.conversation} />
    </div>
  )
}