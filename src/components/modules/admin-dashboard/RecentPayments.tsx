'use client';

import { format, parseISO, Locale } from 'date-fns';
import { vi, enUS, ja } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ArrowRight, CreditCard, Wallet, Building } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminPayment } from '@/types/admin-dashboard';

interface RecentPaymentsProps {
  payments: AdminPayment[];
}

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'VNPAY':
      return <CreditCard className='h-4 w-4 text-blue-600' />;
    case 'MOMO':
      return <Wallet className='h-4 w-4 text-pink-600' />;
    case 'BANK_TRANSFER':
      return <Building className='h-4 w-4 text-emerald-600' />;
    default:
      return <CreditCard className='h-4 w-4 text-slate-600' />;
  }
};

const statusKeys: Record<string, string> = {
  SUCCESS: 'success',
  PENDING: 'pending',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

const getPaymentTypeLabel = (type: string) => {
  switch (type) {
    case 'CONSULTATION':
      return 'Phí khám';
    case 'MEDICINE':
      return 'Tiền thuốc';
    default:
      return type;
  }
};

const getPaymentTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'CONSULTATION':
      return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'MEDICINE':
      return 'bg-amber-50 text-amber-600 border-amber-200';
    default:
      return 'bg-slate-50 text-slate-600 border-slate-200';
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return 'bg-emerald-100 text-emerald-700';
    case 'PENDING':
      return 'bg-amber-100 text-amber-700';
    case 'FAILED':
      return 'bg-red-100 text-red-700';
    case 'REFUNDED':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

const localeMap: Record<string, Locale> = {
  vi: vi,
  en: enUS,
  ja: ja,
};

export const RecentPayments = ({ payments }: RecentPaymentsProps) => {
  const t = useTranslations('Admin.Dashboard');
  const locale = useLocale();
  const dateLocale = localeMap[locale] || vi;

  if (!payments || payments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
      >
        <div className='mb-6'>
          <h3 className='text-lg font-bold text-slate-900'>
            {t('recentPayments.title')}
          </h3>
          <p className='text-sm text-slate-500'>
            {t('recentPayments.subtitle')}
          </p>
        </div>
        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <CreditCard className='mb-4 h-12 w-12 text-slate-300' />
          <p className='text-slate-500'>{t('recentPayments.noData')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            {t('recentPayments.title')}
          </h3>
          <p className='text-sm text-slate-500'>
            {t('recentPayments.subtitle')}
          </p>
        </div>
        <Link href='/admin-transactions'>
          <Button
            variant='ghost'
            size='sm'
            className='gap-2 text-sm text-slate-600 hover:text-slate-900'
          >
            {t('recentPayments.viewAll')}
            <ArrowRight className='h-4 w-4' />
          </Button>
        </Link>
      </div>

      <div className='space-y-3'>
        {payments.map((payment, index) => {
          const statusKey = statusKeys[payment.status] || 'pending';
          return (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className='flex items-center justify-between rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50'
            >
              <div className='flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100'>
                  {getPaymentMethodIcon(payment.method)}
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='font-medium text-slate-900'>
                      {payment.paymentCode}
                    </p>
                    <Badge
                      variant='outline'
                      className={`text-[10px] h-5 px-1.5 ${getPaymentTypeBadgeClass(payment.type)}`}
                    >
                      {getPaymentTypeLabel(payment.type)}
                    </Badge>
                  </div>
                  <p className='text-xs text-slate-500'>
                    {format(parseISO(payment.createdAt), 'dd/MM/yyyy HH:mm', {
                      locale: dateLocale,
                    })}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='text-right'>
                  <p className='font-semibold text-slate-900'>
                    {(payment.amount || 0).toLocaleString('vi-VN')}{' '}
                    <span className='text-xs font-normal text-slate-500'>
                      VNĐ
                    </span>
                  </p>
                </div>
                <Badge className={getStatusBadgeClass(payment.status)}>
                  {t(`statuses.${statusKey}`)}
                </Badge>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
