"use client"
import { RootState } from "@/redux/store"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotFound from "@/components/Error/NotFound";
import { fetchConversationAllMessagesApi, fetchConversationApi } from "@/redux/services/conversation";
import { Conversation, Message, disPatchResponse } from "@/types";
import { MessageHeader, MessageInput, MessagePageSkeleton, MessageSideBar, NavigationSidebar, VirtualizeMessageList } from "@/components/Message";
import { toast } from "sonner";

let pageId = 'no id'
let totalFetchedItemCount: number = 0
let stopFetch = false
let pageLoaded = false

export default function Page({ params }: { params: { id: string } }) {
  const rootConversation = useSelector((Root: RootState) => Root.conversation)
  const dispatch = useDispatch()

  const loadMoreMessages = useCallback(async (conversationId?: string): Promise<boolean> => {
    if (stopFetch) return false
    if (!conversationId) return toast.error('Something went wrong'), false
    const resM = await dispatch(fetchConversationAllMessagesApi({
      id: params.id,
      offset: totalFetchedItemCount,
      limit: 20
    }) as any) as disPatchResponse<Message[]>
    if (resM?.error) return toast.error('Error loading messages'), false
    if (resM.payload.length <= 0) return stopFetch = true, false
    totalFetchedItemCount += resM.payload.length
    return true
  }, [params.id])

  const fetch = useCallback(async () => {
    const res = await dispatch(fetchConversationApi(params.id) as any) as disPatchResponse<Conversation>
    if (res.payload) {
      loadMoreMessages(params.id)
    }
  }, [params.id])

  useEffect(() => {
    if (!pageLoaded || pageId !== params.id) {
      fetch()
      pageId = params.id
      totalFetchedItemCount = 0
      stopFetch = false
      pageLoaded = true
    }
  }, [params.id])

  return (
    <div className='flex'>
      <div className='h-dvh hidden md:flex'>
        <NavigationSidebar hideLabel />
        <MessageSideBar />
      </div>
      {/*  */}
      {rootConversation.loading || !pageLoaded ? <MessagePageSkeleton /> :
        pageLoaded && rootConversation.error || !rootConversation.conversation ? <NotFound /> :
          <div className='w-full flex flex-col min-h-dvh flex-1'>
            <MessageHeader data={rootConversation.conversation} />
            <VirtualizeMessageList conversation={rootConversation.conversation}
              loadMoreMessageLoading={rootConversation.messageLoading}
              loadMore={loadMoreMessages} />
            <MessageInput data={rootConversation.conversation} />
          </div>}
    </div>
  )
}