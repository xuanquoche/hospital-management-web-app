'use client';

import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  Services: [
    'General Medicine',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Emergency Care',
  ],
  Company: ['About Us', 'Our Doctors', 'Careers', 'News', 'Contact'],
  Support: [
    'Patient Portal',
    'Insurance',
    'FAQs',
    'Privacy Policy',
    'Terms of Service',
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className='relative bg-slate-900 border-t border-slate-800'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid md:grid-cols-2 lg:grid-cols-5 gap-12'>
          <div className='lg:col-span-2'>
            <Link
              href='#'
              className='flex items-center gap-3 mb-6 cursor-pointer'
            >
              <div className='relative w-10 h-10'>
                <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 blur-md opacity-50' />
                <div className='relative flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600'>
                  <Heart className='w-5 h-5 text-white fill-white' />
                </div>
              </div>
              <div>
                <span className='text-xl font-bold text-white'>MediCare</span>
                <span className='text-cyan-400 font-bold'>+</span>
              </div>
            </Link>

            <p className='text-slate-400 mb-6 max-w-sm'>
              Providing compassionate, world-class healthcare for you and your
              family. Your health is our mission.
            </p>

            <div className='flex items-center gap-4'>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className='w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-200 cursor-pointer'
                  aria-label={social.label}
                >
                  <social.icon className='w-5 h-5' />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className='text-white font-semibold mb-4'>{category}</h3>
              <ul className='space-y-3'>
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href='#'
                      className='text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm cursor-pointer'
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-slate-500 text-sm'>
            © {new Date().getFullYear()} MediCare+. All rights reserved.
          </p>

          <div className='flex items-center gap-6'>
            <Link
              href='#'
              className='text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer'
            >
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer'
            >
              Terms of Service
            </Link>
            <Link
              href='#'
              className='text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200 cursor-pointer'
            >
              HIPAA Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
