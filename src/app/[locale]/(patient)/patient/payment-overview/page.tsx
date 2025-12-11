'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

import {
  mockInvoices,
  mockPaymentMethods,
} from '@/components/modules/patient/payment-overview/data';
import { InvoiceDetailCard } from '@/components/modules/patient/payment-overview/InvoiceDetailCard';
import { InvoiceList } from '@/components/modules/patient/payment-overview/InvoiceList';
import { PaymentHistoryCard } from '@/components/modules/patient/payment-overview/PaymentHistoryCard';
import { PaymentMethodsCard } from '@/components/modules/patient/payment-overview/PaymentMethodsCard';
import { PaymentSummaryHeader } from '@/components/modules/patient/payment-overview/PaymentSummaryHeader';
import { SupportCard } from '@/components/modules/patient/payment-overview/SupportCard';

export default function PaymentOverviewPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(
    mockInvoices[0].id
  );

  const selectedInvoice =
    mockInvoices.find((inv) => inv.id === selectedInvoiceId) || mockInvoices[0];

  return (
    <div className='min-h-screen bg-slate-50/50 p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Thanh toán</h1>
      </div>

      <PaymentSummaryHeader />

      <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>
        {/* Left Column: Invoices & Details */}
        <div className='xl:col-span-7 space-y-8'>
          <InvoiceList
            invoices={mockInvoices}
            selectedInvoiceId={selectedInvoiceId}
            onSelectInvoice={setSelectedInvoiceId}
          />

          <AnimatePresence mode='wait'>
            <motion.div
              key={selectedInvoiceId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <InvoiceDetailCard invoice={selectedInvoice} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Sidebar */}
        <div className='xl:col-span-5'>
          <PaymentMethodsCard methods={mockPaymentMethods} />
          <PaymentHistoryCard />
          <SupportCard />
        </div>
      </div>
    </div>
  );
}
