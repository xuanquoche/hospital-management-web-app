'use client';

import { motion } from 'framer-motion';
import {
  UserPlus,
  Stethoscope,
  Calendar,
  FileText,
  PlusCircle,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

interface QuickAction {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
  shadowColor: string;
}

const quickActionsConfig: QuickAction[] = [
  {
    titleKey: 'addDoctor',
    descriptionKey: 'addDoctorDesc',
    icon: <Stethoscope className='h-5 w-5' />,
    href: '/admin-doctor/create',
    gradient: 'from-cyan-500 to-blue-600',
    shadowColor: 'shadow-cyan-500/25',
  },
  {
    titleKey: 'manageAppointments',
    descriptionKey: 'manageAppointmentsDesc',
    icon: <Calendar className='h-5 w-5' />,
    href: '/admin-appointments',
    gradient: 'from-violet-500 to-purple-600',
    shadowColor: 'shadow-violet-500/25',
  },
  {
    titleKey: 'patients',
    descriptionKey: 'patientsDesc',
    icon: <UserPlus className='h-5 w-5' />,
    href: '/admin-patient',
    gradient: 'from-emerald-500 to-teal-600',
    shadowColor: 'shadow-emerald-500/25',
  },
  {
    titleKey: 'pharmacy',
    descriptionKey: 'pharmacyDesc',
    icon: <PlusCircle className='h-5 w-5' />,
    href: '/admin-medicines',
    gradient: 'from-amber-500 to-orange-600',
    shadowColor: 'shadow-amber-500/25',
  },
  {
    titleKey: 'transactions',
    descriptionKey: 'transactionsDesc',
    icon: <FileText className='h-5 w-5' />,
    href: '/admin-transactions',
    gradient: 'from-rose-500 to-pink-600',
    shadowColor: 'shadow-rose-500/25',
  },
  {
    titleKey: 'support',
    descriptionKey: 'supportDesc',
    icon: <MessageSquare className='h-5 w-5' />,
    href: '/admin-support',
    gradient: 'from-indigo-500 to-blue-600',
    shadowColor: 'shadow-indigo-500/25',
  },
];

export const QuickActions = () => {
  const t = useTranslations('Admin.Dashboard.quickActions');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
    >
      <div className='mb-5'>
        <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-sm text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        {quickActionsConfig.map((action, index) => (
          <Link key={action.titleKey} href={action.href}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${action.gradient} p-4 shadow-lg ${action.shadowColor} transition-all duration-300 hover:shadow-xl`}
            >
              <div className='absolute -right-3 -top-3 h-16 w-16 rounded-full bg-white/10' />
              <div className='absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/5' />

              <div className='relative z-10'>
                <div className='mb-3 flex items-center justify-between'>
                  <div className='rounded-lg bg-white/20 p-2 backdrop-blur-sm'>
                    <div className='text-white'>{action.icon}</div>
                  </div>
                  <ArrowUpRight className='h-4 w-4 text-white/60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white' />
                </div>

                <h4 className='font-semibold text-white'>
                  {t(action.titleKey)}
                </h4>
                <p className='mt-0.5 text-xs text-white/70'>
                  {t(action.descriptionKey)}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
