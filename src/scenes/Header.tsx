"use client"
import "@fontsource/poppins"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"
import { useClerk, useUser } from "@clerk/clerk-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RiLoader5Line } from "react-icons/ri"
import { FileText, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getRandomAnonymousName } from "../utils/AnonymousUtils"
import logo from "../../public/W (1).svg"

function Header() {
  const user = useUser()
  let userName = user.user?.fullName || user.user?.firstName || user.user?.lastName
  if (!user.isSignedIn) userName = getRandomAnonymousName()

  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: "/" })
    } catch (error) {
      console.error("Error in signing out")
    }
  }

  const handleUserProfileRedirect = () => {
    if (user.isSignedIn) {
      router.push("/user-profile")
    } else {
      router.push("/sign-in")
    }
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center gap-3 transition-transform hover:scale-[0.98]">
          <div className="relative h-10 w-10">
            <Image src={logo || "/placeholder.svg"} alt="Write Pad Logo" className="object-contain" fill priority />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent">Write</span>{" "}
            <span className="text-neutral-800">Pad</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden space-x-8 sm:flex">
            <Link
              href="/documents"
              className="group flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-orange-700"
            >
              <FileText className="h-4 w-4" />
              <span>My Docs</span>
              <span className="block h-0.5 max-w-0 bg-orange-700 transition-all duration-500 group-hover:max-w-full" />
            </Link>
            <Link
              href="/shared-docs"
              className="group flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-orange-700"
            >
              <Share2 className="h-4 w-4" />
              <span>Shared</span>
              <span className="block h-0.5 max-w-0 bg-orange-700 transition-all duration-500 group-hover:max-w-full" />
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleUserProfileRedirect}
                    className="group relative rounded-full p-0.5 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    <Avatar className="h-9 w-9 border-2 border-transparent transition group-hover:border-orange-500">
                      <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${userName}`} alt={userName!} />
                    </Avatar>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-neutral-800 text-xs font-medium text-white">
                  <p>{userName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center">
              <Authenticated>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="rounded-full bg-neutral-100 px-4 text-sm font-medium text-neutral-700 hover:bg-orange-100 hover:text-orange-700"
                >
                  Sign Out
                </Button>
              </Authenticated>
              <Unauthenticated>
                <Button
                  onClick={() => router.push("/sign-in")}
                  className="rounded-full bg-orange-600 px-4 text-sm font-medium text-white hover:bg-orange-700"
                >
                  Sign In
                </Button>
              </Unauthenticated>
              <AuthLoading>
                <Button variant="ghost" className="rounded-full bg-neutral-100 px-4" disabled>
                  <RiLoader5Line className="h-5 w-5 animate-spin" />
                </Button>
              </AuthLoading>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


