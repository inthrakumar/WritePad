'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RiLoader5Line } from "react-icons/ri";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Image from 'next/image'
import logo from "../../public/Writepad_logo.png"
import React from 'react'
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
import { cn } from '@/lib/utils'

export default function SignUpPage() {

    const { theme } = useTheme();
    const mainlogo = theme === 'light' ? logo : dark_logo;
    return (
        <div className="grid w-full  items-center px-4 sm:justify-center border-none shadow-none max-h-[90%]">
            <SignUp.Root>
                <Clerk.Loading>
                    {(isGlobalLoading) => (
                        <>
                            <SignUp.Step name="start">
                                <Card className="w-full sm:w-96  border-none shadow-none max-h-inherit max-lg:px-0">
                                    <CardHeader>
                                        <CardTitle className=' flex items-center justify-center text-nowrap max-sm:text-lg'>Start With WritePad <Image src={mainlogo} alt='mainlogo' width={60} height={60} className='hidden max-sm:block' /></CardTitle>
                                        <CardDescription className='flex items-center justify-center text-nowrap max-sm:text-xs'>
                                            Welcome! Please fill in the details to get started.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4 max-sm:gap-y-1">
                                        <div className="grid grid-cols-1 gap-y-3 gap-x-1">
                                            <Clerk.Connection name="google" asChild>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    type="button" className='max-sm:text-xs max-sm:px-2 max-sm:py-1'

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
                                        <Clerk.Field name="username" className="space-y-2 max-sm:space-y-1">
                                            <Clerk.Label asChild>
                                                <Label>UserName</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="text" required asChild>
                                                <Input />
                                            </Clerk.Input>
                                            <Clerk.FieldError className="block text-sm text-destructive" />
                                        </Clerk.Field>

                                        <Clerk.Field name="emailAddress" className="space-y-2 max-sm:space-y-1">
                                            <Clerk.Label asChild>
                                                <Label>Email address</Label>
                                            </Clerk.Label>
                                            <Clerk.Input type="email" required asChild>
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
                                            <SignUp.Captcha className="empty:hidden" />
                                            <SignUp.Action submit asChild>
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
                                            </SignUp.Action>
                                            <Button variant="link" size="sm" asChild className='max-sm:text-xs'>
                                                <Link href="/sign-in">Already have an account? Sign in</Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignUp.Step>


                            <SignUp.Step name="verifications">
                                <SignUp.Strategy name="email_code">
                                    <Card className="w-full sm:w-96 shadow-none border-none max-lg:p-0">
                                        <CardHeader>
                                            <CardTitle className=' flex items-center justify-center gap-3 max-sm:text-lg text-nowrap'>Verify Your Email <Image src={mainlogo} alt='mainlogo' width={60} height={60} className='hidden max-sm:block' /></CardTitle>
                                            <CardDescription className='flex items-center justify-center text-nowrap max-sm:text-xs'>
                                                Use the verification link sent to your email address
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <div className="grid items-center justify-center gap-y-2">
                                                <Clerk.Field name="code" className="space-y-2">
                                                    <Clerk.Label className="sr-only">Email address</Clerk.Label>
                                                    <div className="flex justify-center text-center">
                                                        <Clerk.Input
                                                            type="otp"
                                                            className="flex justify-center has-[:disabled]:opacity-50"
                                                            autoSubmit
                                                            render={({ value, status }) => {
                                                                return (
                                                                    <div
                                                                        data-status={status}
                                                                        className={cn(
                                                                            'relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md',
                                                                            {
                                                                                'z-10 ring-2 ring-ring ring-offset-background':
                                                                                    status === 'cursor' || status === 'selected',
                                                                            },
                                                                        )}
                                                                    >
                                                                        {value}
                                                                        {status === 'cursor' && (
                                                                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                                                                <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                    <Clerk.FieldError className="block text-center text-sm text-destructive" />
                                                </Clerk.Field>
                                                <SignUp.Action
                                                    asChild
                                                    resend
                                                    className="text-muted-foreground"
                                                    fallback={({ resendableAfter }) => (
                                                        <Button variant="link" size="sm" disabled className='max-sm:text-xs'>
                                                            Didn&apos;t recieve a code? Resend (
                                                            <span className="tabular-nums">{resendableAfter}</span>)
                                                        </Button>
                                                    )}
                                                >
                                                    <Button type="button" variant="link" size="sm" className='max-sm:text-xs'>
                                                        Didn&apos;t recieve a code? Resend
                                                    </Button>
                                                </SignUp.Action>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full  gap-y-4 max-sm:gap-y-2">
                                                <SignUp.Action submit asChild>
                                                    <Button disabled={isGlobalLoading} className='max-sm:text-xs'>
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
                                                </SignUp.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignUp.Strategy>
                            </SignUp.Step>
                        </>
                    )}
                </Clerk.Loading>
            </SignUp.Root>
        </div>
    )
}