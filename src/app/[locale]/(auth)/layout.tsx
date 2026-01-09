import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in or Sign up',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
};

export default async function AuthLayout({ children }: Props) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      {children}
    </div>
  );
}
