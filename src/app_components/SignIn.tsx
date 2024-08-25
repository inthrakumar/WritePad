'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import React from 'react'
import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";
import Image from 'next/image'
import logo from "../../public/Writepad_logo.png"
import dark_logo from "../../public/Writepad_dark_logo.png"
import { useTheme } from 'next-themes'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RiLoader5Line } from "react-icons/ri";

const SignInPage = ({ onToggle }: { onToggle: () => void }) => {


    const { theme } = useTheme();
    const mainlogo = theme === 'light' ? logo : dark_logo;

    return (
        <div className="grid w-full  items-center px-4 sm:justify-center border-none shadow-none h-inherit">
            <SignIn.Root>
                <Clerk.Loading>
                    {(isGlobalLoading) => (
                        <>
                            {/* Sign In Step */}
                            <SignIn.Step name="start">
                                <Card className="w-full sm:w-96  border-none shadow-none max-h-inherit max-lg:px-0">
                                    <CardHeader>
                                        <CardTitle className=' flex items-center justify-center text-nowrap max-sm:text-lg'>Sign in to WritePad <Image src={mainlogo} alt='mainlogo' width={60} height={60} className='hidden max-sm:block' /></CardTitle>
                                        <CardDescription className='flex items-center justify-center text-nowrap max-sm:text-xs'>Welcome back! Please sign in to continue</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4 max-sm:gap-y-1">
                                        <div className="grid grid-cols-1 gap-y-3 gap-x-1">
                                            <Clerk.Connection name="google" asChild>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    type="button"
                                                    className='max-sm:text-xs max-sm:px-2 max-sm:py-1'
                                                    disabled={isGlobalLoading}
                                                >
                                                    <Clerk.Loading scope="provider:google">
                                                        {(isLoading) =>
                                                            isLoading ? (
                                                                <RiLoader5Line className="size-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <FaGoogle className="mr-2 size-4" />
                                                                    Google
                                                                </>
                                                            )
                                                        }
                                                    </Clerk.Loading>
                                                </Button>
                                            </Clerk.Connection>
                                            <Clerk.Connection name="facebook" asChild>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    type="button"
                                                    className='max-sm:text-xs max-sm:px-2 max-sm:py-1'
                                                    disabled={isGlobalLoading}
                                                >
                                                    <Clerk.Loading scope="provider:facebook">
                                                        {(isLoading) =>
                                                            isLoading ? (
                                                                <RiLoader5Line className="size-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <FaFacebook className="mr-2 size-4" />
                                                                    Facebook
                                                                </>
                                                            )
                                                        }
                                                    </Clerk.Loading>
                                                </Button>
                                            </Clerk.Connection>

                                        </div>
                                        <p className="flex items-center gap-x-3 max-sm:gap-x-1 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                            or
                                        </p>
                                        <Clerk.Field name="identifier" className="space-y-2 max-sm:space-y-1">
                                            <Clerk.Label asChild>
                                                <Label>Email address or Username</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="text" required asChild>
                                                <Input />
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>

                                        <Clerk.Field name="password" className="space-y-2 max-sm:space-y-1">
                                            <Clerk.Label asChild>
                                                <Label>Password</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="password" required asChild>
                                                <Input />
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4 max-sm:gap-y-2">
                                            <SignIn.Action submit asChild>
                                                <Button disabled={isGlobalLoading} className='max-sm:text-xs max-sm:py-1 max-sm:px-0'>
                                                    <Clerk.Loading>
                                                        {(isLoading) => {
                                                            return isLoading ? (
                                                                <RiLoader5Line className="size-4 animate-spin" />
                                                            ) : (
                                                                'Continue'
                                                            )
                                                        }}
                                                    </Clerk.Loading>
                                                </Button>
                                            </SignIn.Action>
                                            <div className='grid grid-cols-1 gap-y-2 max-sm:gap-y-1'>
                                                <Button variant="link" size="sm" asChild>
                                                    <Link href="/sign-up" className='max-sm:text-xs'>Don&apos;t have an account? Sign up</Link>
                                                </Button>
                                                <Button variant="link" size="sm" onClick={() => { onToggle() }} className='max-sm:text-xs'>
                                                    Forgot Password

                                                </Button>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignIn.Step>



                        </>
                    )}
                </Clerk.Loading>
            </SignIn.Root>
        </div>
    )
}
export default SignInPage