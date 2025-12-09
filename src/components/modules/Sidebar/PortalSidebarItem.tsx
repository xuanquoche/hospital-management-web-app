import { LucideIcon } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

interface PortalSidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const PortalSidebarItem: React.FC<PortalSidebarItemProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center cursor-pointer gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors',
        isActive
          ? 'bg-teal-600 text-white'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      )}
    >
      <Icon className='h-5 w-5' />
      <span>{label}</span>
    </button>
  );
};

export default PortalSidebarItem;
