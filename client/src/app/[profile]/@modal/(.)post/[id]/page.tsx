/* eslint-disable @next/next/no-img-element */
'use client'
import PostFeedModal from "@/components/home/dialog/PostFeedModal"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RootState } from "@/redux/store"
import { User } from "@/types"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

const ModalFollowing = () => {
  const id = useParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const users = useSelector((state: RootState) => state.users)
  const profile = useSelector((state: RootState) => state.profile.user)
  const isProfile = profile?.id === users.profileData?.user?.id
  const loadedRef = useRef(false)

  const pageRedirect = (user: User) => {
    router.push(`/${user?.email}`)
  }

  // useEffect(() => {
  //   if (!loadedRef.current && id?.profile && profile?.id) {
  //     const FetchFollowingsUser = async () => {
  //       if (id?.profile) {
  //         await dispatch(FetchFollowingsUserDataApi({
  //           profileId: users.profileData?.user?.id as string,
  //           skip: 0,
  //           size: 12
  //         }) as any)
  //       }
  //     }
  //     FetchFollowingsUser()
  //     loadedRef.current = true;
  //   }
  // }, [profile?.id]);

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.back()
    }
  }
  return <PostFeedModal/>
}

export default ModalFollowing;