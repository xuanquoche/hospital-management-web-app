'use client';

import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { useActiveMenu } from '@/hooks/use-active-menu';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  link: string;
}

export function SidebarItem({ icon: Icon, label, link }: SidebarItemProps) {
  const { isActive } = useActiveMenu();
  return (
    <Link
      href={link || '#'}
      className={`flex items-center space-x-2 px-2 py-1.5 rounded-md transition-colors ${
        isActive(link || '#')
          ? 'bg-doctor-primary text-white'
          : 'text-black hover:text-white hover:bg-doctor-primary'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  );
}
