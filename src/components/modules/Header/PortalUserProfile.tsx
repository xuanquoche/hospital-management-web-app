'use client';

import JP from 'country-flag-icons/react/3x2/JP';
import US from 'country-flag-icons/react/3x2/US';
import VN from 'country-flag-icons/react/3x2/VN';
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  CreditCard,
  Loader2,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
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
import { useMe } from '@/hooks/use-me';
import { usePathname, useRouter } from '@/i18n/routing';
import { logout } from '@/utils/logout';

const LANGUAGES = [
  {
    code: 'vi',
    name: 'Tiếng Việt',
    Flag: VN,
  },
  {
    code: 'en',
    name: 'English',
    Flag: US,
  },
  {
    code: 'ja',
    name: '日本語',
    Flag: JP,
  },
] as const;

const PortalUserProfile = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, loading } = useMe();
  const t = useTranslations('UserProfile');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChangeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

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
              <AvatarImage
                src={user?.avatar || 'https://github.com/shadcn.png'}
                alt={user?.fullName || 'User'}
              />
              <AvatarFallback>
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-start'>
              <span className='text-sm font-semibold text-slate-900'>
                {loading ? 'Loading...' : user?.fullName || 'User'}
              </span>
              <span className='text-xs text-slate-500'>
                {loading ? '...' : user?.role || 'Member'}
              </span>
            </div>
            <ChevronDown className='ml-2 h-4 w-4 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180' />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {user?.fullName || 'User'}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {user?.email || 'email@example.com'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className='cursor-pointer'>
              <User className='mr-2 h-4 w-4' />
              <span>{t('profile')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <CreditCard className='mr-2 h-4 w-4' />
              <span>{t('subscription')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>
              <Settings className='mr-2 h-4 w-4' />
              <span>{t('settings')}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className='text-xs font-normal text-slate-500 ml-2'>
            Language
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {LANGUAGES.map(({ code, name, Flag }) => (
              <DropdownMenuItem
                key={code}
                className={`cursor-pointer flex items-center gap-2 ${
                  locale === code ? 'bg-slate-100 font-medium' : ''
                }`}
                onClick={() => handleChangeLanguage(code)}
              >
                <div className='w-5 h-4 rounded-sm overflow-hidden border border-slate-200 flex-shrink-0'>
                  <Flag className='w-full h-full object-cover' />
                </div>
                <span>{name}</span>
                {locale === code && (
                  <div className='ml-auto h-1.5 w-1.5 rounded-full bg-blue-600' />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

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
            <span>{isLoggingOut ? t('loggingOut') : t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PortalUserProfile;
