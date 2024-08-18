'use client'
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Github, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import { registerApi } from "@/redux/services/account";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).toLowerCase().regex(/^[a-z0-9]+$/, {
        message: "Username must contain only letters and numbers."
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            name: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        const { name, username, password, email } = data;
        if (username.includes(" ") || username.includes("@")) {
            toast.error("Username must not contain spaces or @ symbol")
            return
        }
        const res = await registerApi({ email, password, name, username })
        const callbackUrlPath = new URL(window.location.href).searchParams.get("callbackUrl")
        if (res?.code === 1) {
            signIn("credentials", {
                email: res.data.email,
                username: res.data.username,
                name: res.data.name,
                id: res.data.id,
                image: res.data.profilePicture ?? "/user.jpg",
                accessToken: res.data.accessToken,
                redirect: true,
                callbackUrl: callbackUrlPath ? `${process.env.NEXTAUTH_URL}${callbackUrlPath}` : `${process.env.NEXTAUTH_URL}`,
            });
            reset();
            toast.success(`${res.message}`)
        }
        else {
            toast.error(`${res.message}`)
        }
        setLoading(false);
    };

    return (
        <div className="h-[100dvh] p-1 flex justify-center items-center w-full">
            <Card className="md:w-96 md:h-auto w-full h-full pt-16 md:pt-0 rounded-3xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                        Sign Up
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {/* <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" onClick={() => { }}>
                            <Github className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div> */}
                    {/* <div className="h-4 w-full text-center">
                        {errors ? <span className="text-red-500">
                            {errors}
                        </span> : <></>}
                    </div> */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="name" placeholder="example name" {...register("name", { required: true })} />
                        <div className="h-4 w-full text-center mb-2">
                            {errors.name ? <span className="text-red-500">{errors.name?.message}</span> : <></>}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">User Name</Label>
                        <Input id="username" type="username" placeholder="example username" {...register("username", { required: true })} />
                        <div className="h-4 w-full text-center mb-2">
                            {errors.username ? <span className="text-red-500">{errors.username?.message}</span> : <></>}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" {...register("email", { required: true })} />
                        <div className="h-4 w-full text-center mb-2">
                            {errors.email ? <span className="text-red-500">{errors.email?.message}</span> : <></>}
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password"  {...register("password", { required: true })} />
                        <div className="h-4 w-full text-center mb-2">
                            {errors.password ? <span className="text-red-500">{errors.password?.message}</span> : <></>}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                already have an account?
                                <span className="text-primary-foreground cursor-pointer text-sky-400  ml-1"
                                    onClick={() => router.replace(`/auth/login`)}>
                                    Sign In
                                </span>
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        disabled={loading}
                        onClick={handleSubmit(onSubmit)}
                        className="w-full">
                        {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}