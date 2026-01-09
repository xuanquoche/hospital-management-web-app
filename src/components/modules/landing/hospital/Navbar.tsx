'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border border-slate-200 shadow-lg shadow-cyan-500/5'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <nav className='mx-auto max-w-7xl px-6 py-4'>
        <div className='flex items-center justify-between'>
          <Link href='#' className='flex items-center gap-3 cursor-pointer'>
            <div className='relative w-10 h-10'>
              <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 blur-md opacity-40' />
              <div className='relative flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600'>
                <Heart className='w-5 h-5 text-white fill-white' />
              </div>
            </div>
            <div>
              <span className='text-xl font-bold text-slate-800'>MediCare</span>
              <span className='text-cyan-600 font-bold'>+</span>
            </div>
          </Link>

          <div className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className='text-slate-600 hover:text-cyan-600 transition-colors duration-200 text-sm font-medium cursor-pointer'
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className='hidden md:flex items-center gap-4'>
            <Button
              variant='ghost'
              className='text-slate-600 hover:text-cyan-600 hover:bg-cyan-50'
              onClick={() => router.push('/sign-in')}
            >
              Sign In
            </Button>
            <Button className='bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-cyan-500/25'>
              Book Appointment
            </Button>
          </div>

          <button
            className='md:hidden text-slate-700 p-2 cursor-pointer'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className='md:hidden mt-4 pt-4 border-t border-slate-200'
            >
              <div className='flex flex-col gap-4'>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className='text-slate-600 hover:text-cyan-600 transition-colors duration-200 py-2 cursor-pointer'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className='flex flex-col gap-2 pt-4 border-t border-slate-200'>
                  <Button
                    variant='ghost'
                    className='w-full justify-center text-slate-600 hover:text-cyan-600 hover:bg-cyan-50'
                  >
                    Sign In
                  </Button>
                  <Button className='w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold'>
                    Book Appointment
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
