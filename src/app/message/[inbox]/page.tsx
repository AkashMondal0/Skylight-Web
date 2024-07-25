"use client"
import { RootState } from "@/redux/store"
import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import InBoxFooter from '@/components/message/inbox/footer';
import InBoxHeader from '@/components/message/inbox/header';
import { MessagePageSkeleton } from "@/components/message/loading";
import NotFound from "@/components/home/NotFound";
import { fetchConversationApi } from "@/redux/services/conversation";
import VirtualizeMessageList from "@/components/message/inbox/VirtualizeList";
import MList from "../../../../mlist.json"

const MemorizeInBoxFooter = memo(InBoxFooter)
const MemorizeInBoxHeader = memo(InBoxHeader)
const MemorizeInBoxBody = memo(VirtualizeMessageList)
let pageLoaded = false

export default function Page({ params }: { params: { inbox: string } }) {
  const rootConversation = useSelector((Root: RootState) => Root.conversation)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!pageLoaded) {
      dispatch(fetchConversationApi(params.inbox) as any)
      pageLoaded = true
    }
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
      <MemorizeInBoxHeader data={rootConversation.conversation} />
      <MemorizeInBoxBody conversation={rootConversation.conversation} />
      <MemorizeInBoxFooter data={rootConversation.conversation} />
    </div>
  )
}