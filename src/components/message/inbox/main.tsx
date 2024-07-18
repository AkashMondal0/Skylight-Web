"use client"
import React, { useEffect, useRef, useState } from 'react'
import InBoxBody from '@/components/message/inbox/body';
import InBoxFooter from '@/components/message/inbox/footer';
import InBoxHeader from '@/components/message/inbox/header';
import { Conversation } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSelectConversation } from '@/redux/slice/conversation';
import { MessagePageSkeleton } from '../loading';

const MainClientPage = ({ data }: { data: Conversation }) => {
    const dispatch = useDispatch()
    const SelectedConversation = useSelector((Root: RootState)=> Root.conversation)
    const loadedRef = useRef(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!loadedRef.current) {
            dispatch(setSelectConversation(data) as any)
            loadedRef.current = true;
        }
    }, [dispatch, data]);

    if (!SelectedConversation.selectedConversation.Conversation) {
        return <MessagePageSkeleton />
    }

    if (!isClient) return <MessagePageSkeleton />

    return (
        <>
            <InBoxHeader data={SelectedConversation.selectedConversation.Conversation} />
            <InBoxBody data={SelectedConversation.selectedConversation.Conversation} />
            <InBoxFooter data={SelectedConversation.selectedConversation.Conversation} />
        </>
    )
}

export default MainClientPage
