import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '../../app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in or Sign up',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AuthLayout({ children }: Props) {
  return (
    <html lang='en' dir='ltr'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <main className='flex min-h-screen items-center justify-center bg-gray-50'>
          {children}
        </main>
      </body>
    </html>
  );
}
