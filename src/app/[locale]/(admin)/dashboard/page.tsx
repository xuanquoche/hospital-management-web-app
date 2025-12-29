import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('Common');

  return (
    <div className='w-full max-w-md mx-auto'>
      <h1>{t('dashboard')}</h1>
    </div>
  );
}
