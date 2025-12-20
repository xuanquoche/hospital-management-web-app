'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useMemo } from 'react';

import { Role } from '@/const/enum';
import { ADMIN_MENU, PATIENT_MENU } from '@/const/side-bar-menu';

import PortalSidebarItem from './PortalSidebarItem';
import PortalSidebarStats from './PortalSidebarStats';

const PortalSidebar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // 3. Logic check Active linh hoạt hơn (không hardcode /en)
  // Logic này kiểm tra xem pathname hiện tại có chứa route đích hay không
  const checkActive = (href: string) => {
    // Remove locale prefix (e.g., /en, /vi) from pathname to compare with href
    const normalizedPathname = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
    return normalizedPathname === href || normalizedPathname.startsWith(`${href}/`);
  };

  const menuItems = useMemo(() => {
    if (session?.user?.role === Role.ADMIN) return ADMIN_MENU;
    if (session?.user?.role === Role.PATIENT) return PATIENT_MENU;
    return [];
  }, [session?.user?.role]);

  if (status === 'loading') {
    return (
      <div className='sticky top-0 flex h-screen w-[20%] flex-col border-r bg-[#F0FDF9] p-6'>
        <div className='h-8 w-32 animate-pulse rounded bg-teal-100/50 mb-8'></div>
        <div className='space-y-4'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='h-10 w-full animate-pulse rounded bg-slate-100'></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='sticky top-0 flex h-screen w-[20%] flex-col border-r bg-[#F0FDF9]'>
      <div className='p-6'>
        <h1 className='text-xl font-bold text-teal-800'>MediFlow Admin</h1>
      </div>

      <div className='flex-1 px-4 py-2'>
        <h2 className='mb-2 px-2 text-xs font-semibold tracking-wider text-slate-400 uppercase'>Management</h2>

        <div className='space-y-1'>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className='block'>
              <PortalSidebarItem icon={item.icon} label={item.label} isActive={checkActive(item.href)} />
            </Link>
          ))}
        </div>
      </div>

      <PortalSidebarStats />
    </div>
  );
};

export default PortalSidebar;
