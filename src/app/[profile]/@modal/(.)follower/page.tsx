import ModalFollower from "@/components/profile/follower/c";

export default async function Page({ params }: { params: { profile: string } }) {
    return <ModalFollower profileId={params.profile} />
}
