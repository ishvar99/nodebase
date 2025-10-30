'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useForm} from "react-hook-form"
import {toast} from "sonner"
import {z} from "zod"
import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils"

const registerSchema = z.object({
    email: z.email('Please enter a valid email'),
    password: z.string().min(1,"Password is required"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ["confirmPassword"]
})

type registerFormValues = z.infer<typeof registerSchema>;

export function RegisterForm(){
    const router = useRouter();
    const form = useForm<registerFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (values: registerFormValues) => {
        console.log(values)
    }

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">
            <Card>
             <CardHeader className="text-center">
                 <CardTitle>
                    Get Started
                 </CardTitle>
                 <CardDescription>
                    Create your account to get started 
                 </CardDescription>
             </CardHeader>
             <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button
                                variant="outline"
                                className="w-full"
                                type="button"
                                disabled={isPending }
                                >
                                    Continue with GitHub 
                                </Button>
                                <Button
                                variant="outline"
                                className="w-full"
                                type="button"
                                disabled={isPending }
                                >
                                    Continue with Google 
                                </Button>
                                <div className="grid gap-6">
                                    <FormField 
                                    control={form.control}
                                    name="email"
                                    render={({field})=> (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="m@example.com"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem> 
                                    )} />
                                     <FormField 
                                    control={form.control}
                                    name="password"
                                    render={({field})=> (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem> 
                                    )} />
                                     <FormField 
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({field})=> (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="********"
                                                {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem> 
                                    )} />
                                    <Button type='submit' className="w-full cursor-pointer" disabled={isPending}>Sign up</Button>
                                </div>
                                <div className="text-center text-sm"> Already have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4">
                                    Login  
                                </Link>
                                </div>
                            </div>
                        </div>
                        </form>  
                </Form>
             </CardContent>
            </Card>
        </div>
    )
}