import { Filter, ArrowUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PatientFilterProps {
  activeTab: 'all' | 'active' | 'inactive';
  onTabChange: (tab: 'all' | 'active' | 'inactive') => void;
}

export function PatientFilter({ activeTab, onTabChange }: PatientFilterProps) {
  const t = useTranslations('Admin.PatientList.filter');

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='bg-muted/50 inline-flex h-9 items-center justify-center rounded-lg p-1 text-muted-foreground'>
        <button
          onClick={() => onTabChange('all')}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            activeTab === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:bg-background/50 hover:text-foreground'
          )}
        >
          {t('all')}
        </button>
        <button
          onClick={() => onTabChange('active')}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            activeTab === 'active'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:bg-background/50 hover:text-foreground'
          )}
        >
          {t('active')}
        </button>
        <button
          onClick={() => onTabChange('inactive')}
          className={cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            activeTab === 'inactive'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'hover:bg-background/50 hover:text-foreground'
          )}
        >
          {t('inactive')}
        </button>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='sm' className='text-muted-foreground'>
          <Filter className='mr-2 size-4' />
          {t('advanced')}
        </Button>
        <Button variant='ghost' size='sm' className='text-muted-foreground'>
          {t('sortBy')}
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      </div>
    </div>
  );
}
