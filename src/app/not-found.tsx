import NotFound from "@/components/Error/NotFound";
import { NotFoundMetadata } from "@/types/Metadata"

export const metadata = NotFoundMetadata
export default function Page() {
  return <NotFound message="PAGE_NOT_FOUND" />
}