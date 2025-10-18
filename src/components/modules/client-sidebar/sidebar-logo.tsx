'use client';

import { Heart } from 'lucide-react';

export function SidebarLogo() {
  return (
    <div className='flex items-center gap-2 px-6 py-4'>
      <Heart className='text-cyan-600' size={22} fill='currentColor' />
      <span className='text-cyan-700 text-xl font-semibold'>Healthi</span>
    </div>
  );
}
