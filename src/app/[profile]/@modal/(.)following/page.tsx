import ModalFollowing from "@/components/profile/following/c";

export default async function Page({ params }: { params: { profile: string } }) {
    return  <ModalFollowing profileId={params.profile} />
}
