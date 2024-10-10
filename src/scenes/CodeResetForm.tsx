"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RiLoader5Line } from "react-icons/ri";
import Image from "next/image";
import logo from "../../public/Writepad_logo.png";
import dark_logo from "../../public/Writepad_dark_logo.png";
import { useTheme } from "next-themes";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";



const resetSchema = z.object({
    code: z.string().min(6, "Code should be at least 6 numericals"),

    password: z.string().min(8, "Password should be at least 8 characters"),
    confirmPassword: z.string().min(8),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"],
        });
    }
});

export default function ProfileForm() {
    const { theme } = useTheme();
    const mainlogo = theme === "light" ? logo : dark_logo;

    const router = useRouter();
    const { toast } = useToast();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn } = useSignIn();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [secondFactor, setSecondFactor] = useState(false);



    const resetForm = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            code: "",
            password: "",
            confirmPassword: "",
        },
    });

    if (!isLoaded) {
        return null;
    }

    if (isSignedIn) {
        router.push("/sign-in");
        return null;
    }


    async function onReset(values: z.infer<typeof resetSchema>) {
        const { code, password } = values;
        try {
            setIsLoading(true);

            const result = await signIn?.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code,
                password,
            });

            if (result?.status === "needs_second_factor") {
                setSecondFactor(true);
                setError("Two-factor authentication is required.");
            } else if (result?.status === "complete") {
                toast({
                    description: "Password reset was successful",
                });
                router.push("/");
                window.location.reload();
                setError("");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid w-full grow items-center px-4 sm:justify-center">
            <Card className="w-full sm:w-96 shadow-none border-none">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center text-nowrap max-sm:text-lg">
                        Reset Password{" "}
                        <Image
                            src={mainlogo}
                            alt="mainlogo"
                            width={60}
                            height={60}
                            className="hidden max-sm:block"
                        />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...resetForm}>
                        <form
                            onSubmit={resetForm.handleSubmit(onReset)}
                            className="space-y-4 max-sm:space-y-2"
                        >
                            <FormField
                                control={resetForm.control}
                                name="code"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="max-sm:space-y-1">
                                            <FormLabel className="text-sm">
                                                Password Reset Code
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="123-456"
                                                    className="px-2 py-1"
                                                    autoFocus
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                control={resetForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="max-sm:space-y-1">
                                        <FormLabel className="text-sm">
                                            New Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your new password"
                                                className="px-2 py-1"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={resetForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="max-sm:space-y-1">
                                        <FormLabel className="text-sm">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Confirm your new password"
                                                className="px-2 py-1"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <p className="text-red-500">{error}</p>}
                            <Button
                                type="submit"
                                className="w-full max-sm:text-xs"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <RiLoader5Line className="size-4 animate-spin" />
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
