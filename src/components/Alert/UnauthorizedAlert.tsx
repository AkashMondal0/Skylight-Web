'use client'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { configs } from "@/configs"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const UnauthorizedAlert = () => {
    const router = useRouter()
    return <Alert className="flex items-center h-28 absolute bottom-0 justify-around border-0 border-t rounded-none">
        <div className="flex items-center gap-5">
            <img src={configs.AppDetails.logoUrl} alt="upload" className="w-10 h-10" />
            <div>
                <AlertTitle>{`Log into ${configs.AppDetails.name}`}</AlertTitle>
                <AlertDescription>
                    {`Log in to see photos and videos from friends and discover other accounts you'll love.`}
                </AlertDescription>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <Button className="rounded-xl" onClick={() => router.push(`/auth/login`)}>
                Log in
            </Button>
            <Button className="rounded-xl" variant={"secondary"} onClick={() => router.push(`/auth/register`)}>
                Sign Up
            </Button>
        </div>
    </Alert>
}

export default UnauthorizedAlert