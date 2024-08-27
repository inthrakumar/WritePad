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

const formSchema = z.object({
    email: z.string().email("This is not a valid email address"),
});

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

export default function ProfileForm({ onToggle }: { onToggle: () => void }) {
    const { theme } = useTheme();
    const mainlogo = theme === "light" ? logo : dark_logo;

    const router = useRouter();
    const { toast } = useToast();
    const { isSignedIn } = useAuth();
    const { isLoaded, signIn } = useSignIn();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [secondFactor, setSecondFactor] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

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
        router.push("/");
        return null;
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const response = await signIn?.create({
                strategy: "reset_password_email_code",
                identifier: values.email,
            });
            if (response) {
                toast({
                    description: "Check your inbox or spam for the code",
                });
                router.push("/reset-password");
                setError("");
                form.reset();
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                toast({
                    variant: "destructive",
                    description: "Error in sending code",
                });
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
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
                    description: "Password reset was successful and logged in successfully",
                });
                router.push("/");
                setError("");
                resetForm.reset();
            } else {
                console.log(result);
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
            <Card className="w-full sm:w-96 shadow-none border-none max-sm:p-0 max-sm:w-[90%]">
                <CardHeader>
                    <CardTitle className="flex items-center justify-center text-nowrap max-sm:text-lg">
                        Forgot Password{" "}
                        <Image
                            src={mainlogo}
                            alt="mainlogo"
                            width={60}
                            height={60}
                            className="hidden max-sm:block"
                        />
                    </CardTitle>
                    <CardDescription className="flex items-center justify-center text-nowrap max-sm:text-xs">
                        Reset your password by entering your email below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 max-sm:space-y-2"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }: { field: any }) => (
                                    <FormItem className="max-sm:space-y-1">
                                        <FormLabel className="text-sm">
                                            Email for Password Retrieval
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email"
                                                className="px-2 py-1"
                                                autoFocus
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
                                    "Send Code"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="w-full flex items-center justify-center">
                    <Button
                        variant="link"
                        size="sm"
                        disabled={isLoading}
                        onClick={() => {
                            onToggle();
                        }}
                    >
                        Back to Sign In?
                    </Button>
                </CardFooter>
            </Card>

        </div>
    );
}
