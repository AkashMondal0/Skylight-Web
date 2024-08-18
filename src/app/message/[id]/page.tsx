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
import { MessageSideBar } from "@/components/Message/MessageSideBar";
import { NavigationSidebar } from "@/components/Navigation/NavigationSidebar";
import { Conversation, disPatchResponse } from "@/types";
let pageId = 'no id'

export default function Page({ params }: { params: { id: string } }) {
  const rootConversation = useSelector((Root: RootState) => Root.conversation)
  const dispatch = useDispatch()
  const [pageLoaded, setPageLoaded] = useState(false)

  const fetch = useCallback(async () => {
    const res = await dispatch(fetchConversationApi(params.id) as any) as disPatchResponse<Conversation>
    if (!res.error && res.payload.id) {
      await dispatch(fetchConversationAllMessagesApi(res.payload.id) as any)
    }
    pageId = params.id
    setPageLoaded(true)
  }, [params.id])

  useEffect(() => {
    if (!pageLoaded || pageId !== params.id) {
      fetch()
    }
  }, [params.id])

  return (
    <div className='flex'>
      <div className='h-dvh hidden md:flex'>
        <NavigationSidebar hideLabel />
        <MessageSideBar />
      </div>
      {/*  */}
      {rootConversation.messageLoading || !pageLoaded ? <MessagePageSkeleton /> :
        pageLoaded && rootConversation.error || !rootConversation.conversation ? <NotFound /> :
          <div className='w-full flex flex-col min-h-dvh flex-1'>
            <MessageHeader data={rootConversation.conversation} />
            <VirtualizeMessageList conversation={rootConversation.conversation} />
            <MessageInput data={rootConversation.conversation} />
          </div>}
    </div>

  )
}