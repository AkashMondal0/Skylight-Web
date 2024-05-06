import PostFeedModal from "@/components/home/dialog/PostFeedModal"

export default async function Page({ params }: { params: { id: string } }) {

  console.log(params)
  return <PostFeedModal />
}