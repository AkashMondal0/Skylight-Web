"use client"
import { RootState } from "@/redux/store"
import { memo, useContext, useEffect } from "react"
import { useSelector } from "react-redux"
import InBoxBody from '@/components/message/inbox/body';
import InBoxFooter from '@/components/message/inbox/footer';
import InBoxHeader from '@/components/message/inbox/header';
import { MessagePageSkeleton } from "@/components/message/loading";
import NotFound from "@/components/home/NotFound";
import { PageStateContext } from "@/provider/PageState_Provider";
const MemorizeInBoxFooter = memo(InBoxFooter)
const MemorizeInBoxHeader = memo(InBoxHeader)
const MemorizeInBoxBody = memo(InBoxBody)



export default function Page({ params }: { params: { inbox: string } }) {
  const rootConversation = useSelector((Root: RootState) => Root.conversation)
  const pageStateContext = useContext(PageStateContext)

  useEffect(() => {
    if (!pageStateContext?.loaded.inbox || params.inbox !== rootConversation.conversation?.id) {
      pageStateContext?.fetchInboxPageInitial(params.inbox)
    }
  }, [params.inbox])

  if (rootConversation.loading || !pageStateContext?.loaded.inbox) {
    return <MessagePageSkeleton />
  }

  if (!rootConversation.conversation) {
    return <MessagePageSkeleton />
  }

  if (rootConversation.error) {
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