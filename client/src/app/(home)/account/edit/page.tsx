'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { Switch } from "@/components/ui/switch"

const Page = () => {
    return (
        <div className='w-full flex justify-center min-h-[100dvh] h-full'>
            <div className='max-w-[600px] w-full p-4 space-y-6'>
                <h1 className="font-bold text-xl">
                    Edit Account
                </h1>
                <div className='flex justify-between p-4 my-4 bg-secondary text-secondary-foreground rounded-2xl'>
                    <div className='flex space-x-3'>
                        <OptionAvatarDialog>
                            <Avatar className='h-12 w-12 mx-auto cursor-pointer'>
                                <AvatarImage src={"https://github.com/shadcn.png"}
                                    alt="@shadcn" className='rounded-full' />
                            </Avatar>
                        </OptionAvatarDialog>

                        <div>
                            <div className='font-semibold text-base'>akashmondal0</div>
                            <div className='text-sm'>
                                Akash Mondal
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

                <h1 className="font-bold text-xl">
                    Gender
                </h1>
                <div>
                    <SelectGender />
                    <p className='text-xs px-2 py-1'>This won’t be part of your public profile.</p>
                </div>

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
                <div className='flex justify-end'>
                    <Button variant={"default"}
                        className="rounded-xl w-1/2">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import OptionAvatarDialog from '../../profile/dialog/options'

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