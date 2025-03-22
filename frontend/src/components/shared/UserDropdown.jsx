import { useState } from 'react'
import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
     UserIcon,
     Cog6ToothIcon,
     ArrowRightOnRectangleIcon,
     UserCircleIcon,
} from '@heroicons/react/24/outline'

const UserDropdown = () => {
     const [isOpen, setIsOpen] = useState(false)

     return (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
               <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                         <UserCircleIcon className="w-8 h-8" />
                    </button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-48">
                    <DropdownMenuItem className="flex items-center">
                         <UserIcon className="w-4 h-4 mr-2" />
                         <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                         <Cog6ToothIcon className="w-4 h-4 mr-2" />
                         <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center text-red-400 hover:text-red-300">
                         <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                         <span>Sign out</span>
                    </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
     )
}

export default UserDropdown 