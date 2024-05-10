"use client";
import { setUsers } from "@/redux/slice/users";
import { RootState } from "@/redux/store";
import { User } from "@/types";
import { useSession } from "next-auth/react";
import {
    useEffect,
    useMemo,
    useRef
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Lg_Device from "./Lg_Device";
import Sm_Device from "./Sm_Device";

const MainLayout = ({ data }: {
    data: User
}) => {
    const dispatch = useDispatch()
    const session = useSession().data?.user
    const users = useSelector((state: RootState) => state.users)
    const loadedRef = useRef(false)
    const isProfile = useMemo(() => session?.username === data.username, [session?.username, data.username])

    useEffect(() => {
        if (!loadedRef.current) {
            dispatch(setUsers(data) as any)
            loadedRef.current = true;
        }
    }, [dispatch, data]);

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

export default MainLayout
