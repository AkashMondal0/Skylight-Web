"use client"
import { RootState } from "@/redux/store"
import { memo, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import InBoxBody from '@/components/message/inbox/body';
import InBoxFooter from '@/components/message/inbox/footer';
import InBoxHeader from '@/components/message/inbox/header';
import { MessagePageSkeleton } from "@/components/message/loading";
import { fetchConversationApi } from "@/redux/services/conversation";
import NotFound from "@/components/home/NotFound";
const MemorizeInBoxFooter = memo(InBoxFooter)
const MemorizeInBoxHeader = memo(InBoxHeader)
const MemorizeInBoxBody = memo(InBoxBody)



export default function Page({ params }: { params: { inbox: string } }) {
  const dispatch = useDispatch()
  const rootConversation = useSelector((Root: RootState) => Root.conversation)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!loadedRef.current) {
      dispatch(fetchConversationApi(params.inbox) as any)
      loadedRef.current = true;
    }
  }, []);

  if (rootConversation.loading || !loadedRef.current) {
    return <MessagePageSkeleton />
  }

  if (!rootConversation.conversation) {
    return <NotFound/>
  }

  return (
    <div className='w-full flex flex-col'>
      <MemorizeInBoxHeader data={rootConversation.conversation} />
      <MemorizeInBoxBody data={rootConversation.conversation} />
      <MemorizeInBoxFooter data={rootConversation.conversation} />
    </div>
  )
}