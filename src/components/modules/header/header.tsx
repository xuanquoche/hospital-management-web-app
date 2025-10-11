import { HeaderActions, HeaderSearch } from '@/components/modules/header/index';
export default function Header() {
  return (
    <header className='flex items-center justify-between w-full bg-white border-b px-4 py-2'>
      <HeaderSearch />
      <HeaderActions />
    </header>
  );
}
