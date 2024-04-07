'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation"
import { useDispatch } from "react-redux";
import { loginApi, registerApi } from "@/redux/slice/profile/api-functions";
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const FormSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email.",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginPage() {
    const { data: session } = useSession()
    const dispatch = useDispatch();
    const router = useRouter();

    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
            email: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        const { password, email } = data;
        try {
            const res = await dispatch(loginApi({ email, password }) as any)
            if (res.payload?.id) {
                signIn("credentials", {
                    email: res.payload.email,
                    name: res.payload.name,
                    id: res.payload.id,
                    image: res.payload.image || null,
                    redirect: false,
                });
            }
            else {
                toast.error(`${res.payload}`)
            }
        } catch (error: any) {
            console.error("Internal Failed", error);
            toast.error("Internal Failed")
        }
    };
    if (session) {
        return redirect("/")
    }
    return (
        <div className="h-[100dvh] p-1 flex justify-center items-center">
            <Card className="md:w-96 md:h-auto w-full h-full pt-16 md:pt-0 rounded-3xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                        Sign In
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
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
                                Create an account?
                                <span className="text-primary-foreground cursor-pointer text-sky-400  ml-1"
                                    onClick={() => router.replace(`/auth/register`)}>
                                    Sign Up
                                </span>
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        // disabled={true}
                        className="w-full">
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}