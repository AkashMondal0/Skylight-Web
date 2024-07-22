'use client'
import Sm_Navigation from "@/components/home/navigation/sm-navigation";
import ProfileHeader from "@/components/profile/client/header";
import VirtualizedList from '@/components/profile/VirtualizedList';
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileDetailApi, fetchUserProfilePostsApi } from "@/redux/services/profile";
import { setLoadMoreProfilePosts } from "@/redux/slice/profile";
import { getRandomProfilePost } from "@/components/sky/random";
import HeroSection from "@/components/profile/client/hero";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "@/components/sky/icons";


export default function Page({ params }: { params: { profile: string } }) {

    const dispatch = useDispatch()
    const session = useSession().data?.user
    const profile = useSelector((Root: RootState) => Root.profile)
    const loadedRef = useRef(false)
    const isProfile = useMemo(() => session?.username === params.profile, [session?.username])
    const [size, setSize] = useState(250)

    const loadMore = () => {
        const _posts = getRandomProfilePost(size)
        dispatch(setLoadMoreProfilePosts(_posts))
        setSize(size + 12)
    }

    useEffect(() => {
        if (!loadedRef.current) {
            document.title = params.profile
            dispatch(fetchUserProfileDetailApi(params.profile) as any)
            dispatch(fetchUserProfilePostsApi({
                username: params.profile,
                limit: 12,
                offset: 0
            }) as any)
            loadedRef.current = true;
        }
    }, []);

    return (
        <div className="w-full">
            <ProfileHeader name={params.profile} />
            <VirtualizedList data={profile.posts}
                Header={<HeroSection isProfile={isProfile} user={profile.state} />}
                Footer={<Button onClick={loadMore}
                    variant={"outline"}
                    className="rounded-full px-1">
                    <CirclePlus />
                </Button>} />
            <Sm_Navigation />
        </div>
    )
}
