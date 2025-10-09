import { useTranslations } from 'next-intl';

export interface IHeaderSidebarProps {}

export function HeaderSidebar(props: IHeaderSidebarProps) {
  const t = useTranslations('SidebarHeader');
  return (
    <div className='p-4 border-b'>
      <div className='flex items-center space-x-3'>
        <div className='bg-indigo-600 text-white p-2 rounded-lg'>
          <span className='font-bold'>TC</span>
        </div>
        <div>
          <p className='font-semibold text-gray-800 text-sm'>{t('logoName')}</p>
          <p className='text-xs text-gray-500'>{t('location')}</p>
        </div>
      </div>
    </div>
  );
}
