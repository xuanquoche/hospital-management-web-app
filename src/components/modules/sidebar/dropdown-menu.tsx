import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useActiveMenu } from '@/hooks/use-active-menu';

type ItemMenuProps = {
  link: string;
  label: string;
};

function DropdownMenuComponent({
  label,
  icon,
  open,
  onToggle,
  items,
}: {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  items: ItemMenuProps[];
}) {
  const { isActive } = useActiveMenu();

  const parentActive = items.some((item) => isActive(item.link));

  return (
    <div>
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full px-2 py-1.5 rounded-md transition-colors ${
          parentActive
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-black hover:text-indigo-600 hover:bg-indigo-50'
        }`}
      >
        <div className='flex items-center space-x-2'>
          {icon}
          <span className='text-xl'>{label}</span>
        </div>
        {open ? (
          <ChevronDown className='h-4 w-4 text-gray-500' />
        ) : (
          <ChevronRight className='h-4 w-4 text-gray-500' />
        )}
      </button>

      {open && (
        <div className='ml-7 space-y-1 border-l-2 my-3'>
          {items.map((item) => {
            const active = isActive(item.link);
            return (
              <Link
                key={item.label}
                href={item.link}
                className={`block text-xl px-2 py-1.5 rounded-md transition-colors ${
                  active
                    ? ' text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const DropdownMenu = React.memo(DropdownMenuComponent);
