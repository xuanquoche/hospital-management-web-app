'use client'; // Bắt buộc giữ dòng này vì có tương tác UI

import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  CreditCard,
  Loader2, // Icon loading
} from 'lucide-react';
import React, { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Import hàm logout từ file bạn vừa tạo ở Bước 1
import { logout } from '@/utils/logout';

const PortalUserProfile = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (e: Event) => {
    e.preventDefault();

    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className='flex items-center gap-4'>
      <Button
        variant='ghost'
        size='icon'
        className='text-slate-500 hover:text-slate-700 transition-colors'
      >
        <Bell className='h-5 w-5' />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1 pr-4 transition-all hover:bg-slate-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 data-[state=open]:bg-slate-50'>
            <Avatar className='h-8 w-8 border border-slate-100'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold text-slate-900'>
                Dr. Admin
              </span>
              <span className='text-xs text-slate-500'>
                System Administrator
              </span>
            </div>
            <ChevronDown className='ml-2 h-4 w-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180' />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>Dr. Admin</p>
              <p className='text-xs leading-none text-muted-foreground'>
                admin@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className='cursor-pointer'>
              <User className='mr-2 h-4 w-4' />
              <span>Hồ sơ cá nhân</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Gói dịch vụ</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <Settings className='mr-2 h-4 w-4' />
              <span>Cài đặt</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Item Logout */}
          <DropdownMenuItem
            className='cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50'
            onSelect={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <LogOut className='mr-2 h-4 w-4' />
            )}
            <span>{isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PortalUserProfile;
