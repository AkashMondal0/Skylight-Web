'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SkyAvatar from '@/components/sky/SkyAvatar'
import { signOut, useSession } from 'next-auth/react'
import { logoutApi } from '@/redux/services/account'
import OptionAvatarDialog from '@/components/Dialog/Avatar.Options.Dialog'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const Page = () => {
    const router = useRouter()
    const { setTheme, themes, theme } = useTheme()
    const profile = useSession().data
    if (!profile?.user) return null
    return (
        <>
            <div className='w-full flex justify-center h-dvh overflow-y-auto'>
                <div className='max-w-[600px] w-full p-4 space-y-6'>
                    <h1 className="font-bold text-xl">
                        Edit Account
                    </h1>
                    <div className='flex justify-between p-4 my-4 bg-secondary text-secondary-foreground rounded-2xl'>
                        <div className='flex space-x-3'>
                            <SkyAvatar className='h-12 w-12 mx-auto' url={profile.user?.image || null} />
                            <div>
                                <div className='font-semibold text-base'>{profile.user.username}</div>
                                <div className='text-sm'>
                                    {profile.user.name}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <OptionAvatarDialog>
                                <Button variant={"default"} className="rounded-xl">
                                    change photo
                                </Button>
                            </OptionAvatarDialog>

                        </div>
                    </div>
                    <h1 className="font-bold text-xl">
                        Website
                    </h1>
                    <div>
                        <input type="text" disabled placeholder="Website"
                            className='w-full p-4 bg-secondary 
                     text-secondary-foreground rounded-2xl
                      cursor-not-allowed' />
                        <p className='text-xs my-2'>
                            Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.
                        </p>
                    </div>

                    <h1 className="font-bold text-xl">
                        Bio
                    </h1>
                    <Textarea placeholder="Bio"
                        className='w-full p-4 rounded-2xl' />

                    {/* <h1 className="font-bold text-xl">
                        Gender
                    </h1> */}
                    {/* <div>
                        <SelectGender />
                        <p className='text-xs px-2 py-1'>This won’t be part of your public profile.</p>
                    </div> */}
                    <h1 className="font-bold text-xl">
                        Switch appearance
                    </h1>
                    <Card className='p-4 rounded-2xl flex justify-between items-center'>
                        <div className='pr-4'>
                            <div className='text-lg flex gap-2 items-center'>
                                {theme === "dark" ? 
                                    <Sun /> :
                                    <Moon />}
                                {theme === "dark" ? "Light" : "Dark"} Mode</div>
                        </div>
                        <Switch onCheckedChange={() => {
                            if (theme !== "dark") {
                                setTheme("dark")
                            } else {
                                setTheme("light")
                            }
                        }} defaultChecked={theme === "dark"} />
                    </Card>

                    <h1 className="font-bold text-xl">
                        Show account suggestions on profiles
                    </h1>
                    <Card className='p-4 rounded-2xl flex justify-between items-center'>
                        <div className='pr-4'>
                            <p className='text-lg'>Show account suggestions on profiles</p>
                            <p className='text-xs opacity-80'>
                                Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.
                            </p>
                        </div>
                        <Switch />
                    </Card>
                    <div className='flex justify-around gap-4' >
                        <Button variant={"destructive"}
                            onClick={() => {
                                signOut()
                                logoutApi()
                                router.replace('/auth/login')
                            }}
                            className="rounded-xl w-full">
                            logout
                        </Button>
                        <div className='h-20'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page

function SelectGender() {
    return (
        <Select>
            <SelectTrigger className="w-full rounded-2xl">
                <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent className='rounded-2xl'>
                <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="Male" className='rounded-2xl'>Male</SelectItem>
                    <SelectItem value="Female" className='rounded-2xl'>Female</SelectItem>
                    <SelectItem value="Other" className='rounded-2xl'>Other</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}