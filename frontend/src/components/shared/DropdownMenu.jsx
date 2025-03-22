import {
     DropdownMenu,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
     UserIcon,
     Cog6ToothIcon,
     ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const UserDropdownMenu = ({ isOpen, onClose, children }) => {
     const menuItems = [
          {
               icon: UserIcon,
               label: 'Profile',
               onClick: () => console.log('Profile clicked'),
          },
          {
               icon: Cog6ToothIcon,
               label: 'Settings',
               onClick: () => console.log('Settings clicked'),
          },
          {
               icon: ArrowRightOnRectangleIcon,
               label: 'Sign out',
               onClick: () => console.log('Sign out clicked'),
          },
     ];

     return (
          <DropdownMenu open={isOpen} onOpenChange={onClose}>
               <DropdownMenuTrigger asChild>
                    {children}
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-48 bg-gray-900/95 backdrop-blur-xl border-white/10 text-white">
                    {menuItems.map((item, index) => (
                         <DropdownMenuItem
                              key={index}
                              onClick={item.onClick}
                              className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-white/10 cursor-pointer"
                         >
                              <item.icon className="w-5 h-5 mr-3" />
                              {item.label}
                         </DropdownMenuItem>
                    ))}
               </DropdownMenuContent>
          </DropdownMenu>
     );
};

export default UserDropdownMenu; 