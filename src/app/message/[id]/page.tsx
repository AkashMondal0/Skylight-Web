/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { RootState } from "@/redux/store"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotFound from "@/components/Error/NotFound";
import { fetchConversationAllMessagesApi, fetchConversationApi } from "@/redux/services/conversation";
import { MessageHeader } from "@/components/Message/MessageHeader";
import { MessageInput } from "@/components/Message/MessageInput";
import { MessagePageSkeleton } from "@/components/loading/Message.page";
import VirtualizeMessageList from "@/components/Message/VirtualMessageList";
let pageId = 'no id'

export default function Page({ params }: { params: { id: string } }) {
  const rootConversation = useSelector((Root: RootState) => Root.conversation)
  const dispatch = useDispatch()
  const [pageLoaded, setPageLoaded] = useState(false)

  const fetch = useCallback(async () => {
    await dispatch(fetchConversationApi(params.id) as any)
    await dispatch(fetchConversationAllMessagesApi(params.id) as any)
    pageId = params.id
    setPageLoaded(true)
  }, [params.id])

  useEffect(() => {
    if (!pageLoaded || pageId !== params.id) {
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
    <div className='w-full flex flex-col min-h-dvh flex-1'>
      <MessageHeader data={rootConversation.conversation} />
      <VirtualizeMessageList conversation={rootConversation.conversation} />
      <MessageInput data={rootConversation.conversation} />
    </div>
  )
}