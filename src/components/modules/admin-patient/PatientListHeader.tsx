import { Download, Upload, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export function PatientListHeader() {
  const t = useTranslations('Admin.PatientList');

  return (
    <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
      <div>
        <h1 className='text-2xl font-bold tracking-tight'>{t('title')}</h1>
        <p className='text-muted-foreground mt-1 text-sm'>{t('subtitle')}</p>
        <div className='text-muted-foreground mt-2 flex items-center gap-2 text-xs'>
          <span>{t('totalPatients')}: 1,248</span>
          <span>•</span>
          <span>{t('newThisMonth')}: 86</span>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='sm'>
          <Download className='mr-2 size-4' />
          {t('export')}
        </Button>
        <Button
          variant='outline'
          size='sm'
          className='bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800'
        >
          <Upload className='mr-2 size-4' />
          {t('import')}
        </Button>
        <Button size='sm' className='bg-emerald-600 hover:bg-emerald-700'>
          <Plus className='mr-2 size-4' />
          {t('createPatient')}
        </Button>
      </div>
    </div>
  );
}
