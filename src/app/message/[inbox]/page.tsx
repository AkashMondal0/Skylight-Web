"use client"
import { RootState } from "@/redux/store"
import { memo, useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import InBoxBody from '@/components/message/inbox/body';
import InBoxFooter from '@/components/message/inbox/footer';
import InBoxHeader from '@/components/message/inbox/header';
import { MessagePageSkeleton } from "@/components/message/loading";
import NotFound from "@/components/home/NotFound";
import { fetchConversationApi } from "@/redux/services/conversation";
const MemorizeInBoxFooter = memo(InBoxFooter)
const MemorizeInBoxHeader = memo(InBoxHeader)
const MemorizeInBoxBody = memo(InBoxBody)
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
      <MemorizeInBoxBody data={rootConversation.conversation} />
      <MemorizeInBoxFooter data={rootConversation.conversation} />
    </div>
  )
}