'use client';
import { usePathname, useParams } from 'next/navigation';

export function useActiveMenu() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || '';

  const isActive = (link: string) => {
    console.log('pathname', pathname, 'link', `/${locale}${link}`);
    return pathname === `/${locale}${link}`;
  };

  return { pathname, isActive };
}
