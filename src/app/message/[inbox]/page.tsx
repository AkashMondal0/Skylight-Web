"use client"
import { RootState } from "@/redux/store"
import {useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotFound from "@/components/Error/NotFound";
import { fetchConversationApi } from "@/redux/services/conversation";
import { MessageHeader } from "@/components/Message/MessageHeader";
import { MessageInput } from "@/components/Message/MessageInput";
import VirtualizeMessageList from "@/components/Message/VirtualMessageList";
import { MessagePageSkeleton } from "@/components/loading/Message.page";

let pageLoaded = false

export default function Page({ params }: { params: { inbox: string } }) {
  const rootConversation = useSelector((Root: RootState) => Root.conversation)
  const dispatch = useDispatch()

  useEffect(() => {
    // if (!pageLoaded || params.inbox !== rootConversation.conversation?.id) {
    dispatch(fetchConversationApi(params.inbox) as any)
    pageLoaded = true
    // }
  }, [params.inbox])

  if (rootConversation.loading) {
    return <MessagePageSkeleton />
  }

  if (!rootConversation.conversation) {
    if (!rootConversation.error) {
      return <MessagePageSkeleton />
    }
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