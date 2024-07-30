"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { LoadingUserCardWithButton } from '@/components/loading/Card'
import { UserItemFollow } from '@/components/Card/UserItem'
import {TempleDialog} from '@/components/Dialog/Temple.Dialog'


const ViewLikeDialog = ({
  children
}: {
  children: React.ReactNode
}) => {
  const likes = useSelector((Root: RootState) => Root.posts)

  return (<TempleDialog TriggerChildren={children} headerTitle={'Likes'}>
    {likes.likeLoading ? <>{Array(10).fill(0).map((_, i) => <LoadingUserCardWithButton key={i} />)}</> : <>{likes.likesUserList?.map((user, i) => (<UserItemFollow key={i} user={user} />))}</>}
  </TempleDialog>)
}

export default ViewLikeDialog