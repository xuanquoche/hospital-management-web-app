'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { useMe } from '@/hooks/use-me';

import PortalSearchBar from './PortalSearchBar';
import PortalUserProfile from './PortalUserProfile';

interface PortalHeaderProps {
  badgeText?: string;
}

const PortalHeader = ({ badgeText = 'admin' }: PortalHeaderProps) => {
  const { user } = useMe();
  const t = useTranslations('Portal.Header');

  // Map lowercase badgeText to translation keys, fallback to raw badgeText if no translation
  const displayBadgeText = t.has(badgeText.toLowerCase())
    ? t(badgeText.toLowerCase())
    : badgeText;

  return (
    <header className='flex h-20 items-center justify-between border-b border-slate-100 bg-white px-8'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl font-bold text-slate-900'>
          {t('greeting', { name: user?.fullName || '' })}
        </h2>
        <Badge
          variant='secondary'
          className='bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          {displayBadgeText}
        </Badge>
      </div>

      <div className='flex flex-1 items-center justify-center px-8'>
        <PortalSearchBar />
      </div>

      <PortalUserProfile />
    </header>
  );
};

export default PortalHeader;
