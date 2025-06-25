'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession } from 'next-auth/react';
import { extractInitials } from '@/_lib/utils';
import { useRouter } from 'next/navigation';
import { CLIENT_ROUTES } from '@/_lib/routes';
import { ACCOUNT_TYPE } from '@/constants/generic';

export function UserNav() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-5 w-5 rounded-full hover:bg-blue-50 border border-blue-100 transition-all duration-200"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#337ab7] text-white font-semibold text-sm">
              {extractInitials(session?.user?.firstName ?? '')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 bg-white border border-blue-100 shadow-lg rounded-xl" 
        align="end" 
        forceMount
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-0">
          <div className="flex items-center space-x-3 px-4 py-3 border-b border-blue-50">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-[#337ab7] text-white font-semibold">
                {extractInitials(session?.user?.firstName ?? '')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-gray-900">
                {session?.user?.firstName ?? ''}
              </p>
              <p className="text-xs leading-none text-gray-500">
                {session?.user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="border-blue-50" />
        
        <DropdownMenuGroup className="py-2">
          <DropdownMenuItem
            onClick={() =>
              router.push(CLIENT_ROUTES.PrivatePages.clientDashboard.profile)
            }
            className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#337ab7] cursor-pointer transition-colors focus:bg-blue-50 focus:text-[#337ab7]"
          >
            <span className="text-sm">Profile</span>
            <DropdownMenuShortcut className="text-gray-400">⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          
          {session?.user.accountType === ACCOUNT_TYPE.ADMIN && (
            <DropdownMenuItem className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#337ab7] cursor-pointer transition-colors focus:bg-blue-50 focus:text-[#337ab7]">
              <span className="text-sm">Team</span>
              <DropdownMenuShortcut className="text-gray-400">⇧⌘T</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="border-blue-50" />
        
        <DropdownMenuItem className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer transition-colors focus:bg-red-50 focus:text-red-700">
          <span className="text-sm">Log out</span>
          <DropdownMenuShortcut className="text-red-400">⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}