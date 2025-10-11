import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export function HeaderSearch() {
  return (
    <div className='relative w-64'>
      <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
      <Input placeholder='Search' className='pl-9 rounded-lg' />
    </div>
  );
}
