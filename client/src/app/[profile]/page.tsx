import { notFound, redirect } from "next/navigation"
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import SkeletonProfile from "@/components/profile/loading/skeleton";
import { configs } from "@/configs";
import { getServerSession } from "next-auth";

const Lg_Device = dynamic(() => import('@/components/profile/Lg_Device'), {
    loading: () => <SkeletonProfile />
})
const Sm_Device = dynamic(() => import('@/components/profile/Sm_Device'), {
    loading: () => <SkeletonProfile />
})

async function getProfileData(userEmail: string) {
    try {
        // const response = await fetch(`${configs.appUrl}/api/profile`, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "authorization": `${cookies().get("token-auth")?.value}`
        //     },
        //     cache: "no-store"
        // });
        // const data = await response.json();
        // console.log(data)
        // return data.data;
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "authorization": `${cookies().get("token-auth")?.value}`
            },
            body: JSON.stringify({
                query: `{
                    books {
                      title
                    }
                  }`
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
    } catch (error) {
        console.log(error)
        return notFound()
    }
}


export default async function Page({ params }: { params: { profile: string } }) {

    try {
        const session = await getServerSession();
        if (!session?.user) {
            return redirect("/auth/login")
        }

        const isProfile = params.profile.replace(/%40/g, "@") === session.user.email;
        const data = await getProfileData(params.profile) as any;

        return <>
            {/* <div className='w-full min-h-[100dvh]'>
                <div className='mx-auto max-w-[960px] overflow-x-hidden'>
                    <Lg_Device
                        isProfile={isProfile}
                        user={data} />
                    <Sm_Device isProfile={isProfile}
                        user={data} />
                </div>
            </div > */}
        </>
    } catch (error) {
        return notFound()
    }
}


