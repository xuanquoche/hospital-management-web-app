'use client';

import { LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/utils/logout';

export function UserAvatar() {
  const t = useTranslations('setting');
  const handleLogout = () => {
    logout();
  };

  const handleProfile = () => {
    console.log('Profile clicked');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Avatar className='cursor-pointer hover:opacity-80 transition'>
            <AvatarImage src='/avatar.jpg' alt='User' />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuLabel>{t('account')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile} className='cursor-pointer'>
          <User className='mr-2 h-4 w-4' />
          <span>{t('profile')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
