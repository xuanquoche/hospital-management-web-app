'use client';
import { usePathname, useParams } from 'next/navigation';

export function useActiveMenu() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || '';

  const isActive = (link: string) => {
    return pathname === `/${locale}${link}`;
  };

  return { pathname, isActive };
}
