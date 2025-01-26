import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter, usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const ITEMS_TO_DISPLAY = 3

export function BreadCrumbs() {
  const router = useRouter()
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const items = segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join("/")}`,
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
  }))

  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const handleNavigation = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  const renderEllipsisContent = () => (
    <>
      {items.slice(1, -2).map((item, index) => (
        <DropdownMenuItem key={index} onSelect={() => handleNavigation(item.href)}>
          {item.label}
        </DropdownMenuItem>
      ))}
    </>
  )

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">{renderEllipsisContent()}</DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto">
                      <BreadcrumbEllipsis className="h-4 w-4" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>Select a page to navigate to.</DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {items.slice(1, -2).map((item, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="justify-start"
                          onClick={() => handleNavigation(item.href)}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : null}
        {items.slice(-ITEMS_TO_DISPLAY).map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                <Button variant="link" className="p-0 h-auto" onClick={() => handleNavigation(item.href)}>
                  {item.label}
                </Button>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < items.slice(-ITEMS_TO_DISPLAY).length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}


