'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { clientNavbarItems } from "@/constants/contents";
import { logo } from "@/public";
import { useSession } from 'next-auth/react'
import { CLIENT_ROUTES } from "@/_lib/routes";
import { extractInitials } from "@/_lib/utils";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { UserNav } from "./user-nav";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export const company = {
  name: 'Hisnad',
  sub: 'Home',
  logo: logo,
  plan: 'Client',
};

export function AppSidebarClient({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const router = useRouter();
  const pathname = usePathname();


  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="bg-white border-r border-blue-100 shadow-sm"
        variant="inset"
      >
        <SidebarHeader className="border-b border-blue-50 bg-blue-50/30 px-6 py-4">
          <div>
            <Link href={CLIENT_ROUTES.PrivatePages.clientDashboard.overview} className="group" aria-label="Hisnad Home">
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-0.5">
                <div className="relative">
                  <Image
                    src={company.logo}
                    alt="Hisnad Logo"
                    width={64}
                    height={64}
                    className="w-10 h-10 sm:w-14 sm:h-14 transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110 drop-shadow-lg"
                    priority
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 -z-10" />
                </div>
              </div>
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-x-hidden bg-white">
          <SidebarGroup className="px-3 py-4">
            <SidebarGroupLabel className="text-[#337ab7] font-semibold text-xs uppercase tracking-wider mb-3 px-3">
              Overview
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {clientNavbarItems.map((itm) => {
                  const isActive = pathname === itm.url;

                  return (
                    <SidebarMenuItem key={itm.title}>
                      <SidebarMenuButton
                        asChild
                        className={`
                          rounded-lg transition-all duration-200 px-3 py-2.5 font-medium
                          ${itm.isActive === isActive
                            ? 'bg-[#337ab7] text-white shadow-sm' : 'text-gray-700 hover:bg-blue-50 hover:text-[#337ab7]'
                          }
                        `}
                      >
                        <Link href={itm.url} className="flex items-center gap-3">
                          <itm.icon className="w-5 h-5" />
                          <span className="text-sm">{itm.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-blue-50 bg-blue-50/20 p-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="hover:bg-blue-100 data-[state=open]:bg-[#337ab7] data-[state=open]:text-white rounded-lg p-3 transition-all duration-200 flex items-center"
                  >
                    <Avatar className="">
                      <AvatarFallback className=" bg-[#337ab7] text-white font-semibold text-sm w-8 h-8 rounded-full p-1">
                        {extractInitials(session?.data?.user.firstName ?? '')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-3">
                      <span className="truncate font-semibold text-gray-900">
                        {session?.data?.user.firstName ?? ''}
                      </span>
                      <span className="truncate text-xs text-gray-500">
                        {session?.data?.user.email ?? ''}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 text-gray-400" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-32 min-w-56 rounded-xl bg-white border border-blue-100 shadow-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-3 px-2 py-3 text-left text-sm border-b border-blue-50">
                      <Avatar className=" ">
                        <AvatarFallback className="bg-[#337ab7] text-white font-semibold text-sm w-8 h-8 rounded-full p-1">
                          {extractInitials(session.data?.user.firstName ?? '')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold text-gray-900">
                          {session?.data?.user.firstName ?? ''}
                        </span>
                        <span className="truncate text-xs text-gray-500">
                          {session?.data?.user.email ?? ''}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-1 border-t border-blue-50" />

                  <DropdownMenuItem
                    onClick={() => {

                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <LogOut className="size-4 mr-3" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 bg-white border-b border-blue-100 shadow-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-6">
            <SidebarTrigger className="-ml-1 text-[#337ab7] hover:bg-blue-50 rounded-md p-2 transition-colors" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-blue-200" />
            {/* <Breadcrumbs /> */}
          </div>

          <div className="hidden justify-end items-center gap-2 px-4 md:flex">
            <div className="flex items-center gap-3 px-6">
              <UserNav />
            </div>
            {session.data?.user.accountType?.toLowerCase()}

          </div>
        </header>

        <main className="bg-blue-50/30 min-h-screen">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}