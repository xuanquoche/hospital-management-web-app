import Link from 'next/link';
import React from 'react';

import { useActiveMenu } from '@/hooks/use-active-menu';

export const MenuItem = React.memo(function MenuItem({
  icon,
  label,
  link,
}: {
  icon: React.ReactNode;
  label: string;
  link?: string;
}) {
  const { isActive } = useActiveMenu();
  return (
    <Link
      href={link || '#'}
      className={`flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${
        isActive(link || '#')
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-black hover:text-indigo-600 hover:bg-indigo-50'
      }`}
    >
      {icon}
      <span className='text-xl'>{label}</span>
    </Link>
  );
});
