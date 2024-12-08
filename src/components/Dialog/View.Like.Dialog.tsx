"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { LoadingUserCardWithButton } from '@/components/loading/Card'
import { UserItemFollow } from '@/components/Card/UserItem'
import {TempleDialog} from '@/components/Dialog/Temple.Dialog'
import { RootState } from '@/redux-stores/store'


const ViewLikeDialog = ({
  children
}: {
  children: React.ReactNode
}) => {
  const likesUserList = useSelector((Root: RootState) => Root.PostState.likesUserList)
  const likesLoading = useSelector((Root: RootState) => Root.PostState.likesLoading)


  return (<TempleDialog TriggerChildren={children} headerTitle={'Likes'}>
    {likesLoading !== "normal" ? <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</> : <>{likesUserList?.map((user, i) => (<UserItemFollow key={i} user={user} />))}</>}
  </TempleDialog>)
}

export default ViewLikeDialog