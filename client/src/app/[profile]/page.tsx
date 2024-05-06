"use client"
import SkeletonProfile from "@/components/profile/loading/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { FetchUserProfileDataApi } from "@/redux/slice/users/api-functions";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import Lg_Device from "@/components/profile/Lg_Device";
import Sm_Device from "@/components/profile/Sm_Device";

export default function Page({ params }: { params: { profile: string } }) {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const users = useSelector((state: RootState) => state.users)
    const loadedRef = useRef(false)
    const isProfile = useMemo(() => session?.username === params.profile, [session?.username, params.profile])

    useEffect(() => {
        if (!loadedRef.current) {
            const StartApp = async () => {
                await dispatch(FetchUserProfileDataApi({ id: params.profile }) as any)
            }
            StartApp()
            loadedRef.current = true;
        }
    }, [dispatch, params.profile]);

    if (users.profileData.error) {
        return <div>page not exits</div>
    }
    if (users.profileData.loading) {
        return <SkeletonProfile />
    }

    if (users?.profileData.user) {
        return <>
            <div className='w-full min-h-[100dvh]'>
                <div className='mx-auto max-w-[960px] overflow-x-hidden'>
                    <Lg_Device
                        isProfile={isProfile}
                        user={users.profileData.user} />
                    <Sm_Device isProfile={isProfile}
                        user={users.profileData.user} />
                </div>
            </div >
        </>
    }

}
