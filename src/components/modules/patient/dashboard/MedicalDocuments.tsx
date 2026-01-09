'use client';

import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { ConsultationHistory } from '@/types/patient-dashboard';

interface MedicalDocumentsProps {
  consultations: ConsultationHistory[];
}

interface DocumentItem {
  name: string;
  type: string;
  count: number;
}

export const MedicalDocuments = ({ consultations }: MedicalDocumentsProps) => {
  const t = useTranslations('Patient.Dashboard.Documents');
  const documents = useMemo<DocumentItem[]>(() => {
    if (!consultations || consultations.length === 0) return [];

    let totalPrescriptions = 0;
    let totalDiagnosis = 0;

    consultations.forEach((consultation) => {
      if (consultation.prescriptionItems?.length > 0) {
        totalPrescriptions += consultation.prescriptionItems.length;
      }
      if (consultation.diagnosis) {
        totalDiagnosis += 1;
      }
    });

    const docs: DocumentItem[] = [];

    if (totalPrescriptions > 0) {
      docs.push({
        name: t('docType.prescription'),
        type: t('docType.prescription').split(' ')[0], // Simulating a type label
        count: totalPrescriptions,
      });
    }

    if (totalDiagnosis > 0) {
      docs.push({
        name: t('docType.diagnosis'),
        type: t('docType.diagnosis').split(' ')[0],
        count: totalDiagnosis,
      });
    }

    return docs;
  }, [consultations, t]);

  if (documents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
      >
        <div className='mb-6'>
          <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
          <p className='text-slate-500'>{t('subtitle')}</p>
        </div>

        <div className='flex flex-col items-center justify-center py-8 text-center'>
          <FileText className='mb-4 h-12 w-12 text-slate-300' />
          <p className='mb-2 text-slate-600'>{t('noDocs')}</p>
          <p className='text-sm text-slate-400'>{t('noDocsDetail')}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>{t('title')}</h3>
        <p className='text-slate-500'>{t('subtitle')}</p>
      </div>

      <div className='space-y-4 mb-6'>
        {documents.map((doc, index) => (
          <div
            key={index}
            className='flex items-center justify-between rounded-lg border border-slate-50 bg-slate-50/50 p-3 transition-colors hover:bg-slate-100'
          >
            <span className='font-medium text-slate-700 truncate max-w-[180px]'>
              {doc.name}
            </span>
            <span className='text-xs text-slate-500 whitespace-nowrap'>
              {doc.type} • {doc.count} {t('items')}
            </span>
          </div>
        ))}
      </div>

      <Link href='/patient/health-record'>
        <Button
          variant='secondary'
          className='w-full bg-teal-50 text-teal-700 hover:bg-teal-100'
        >
          {t('manageDocs')}
        </Button>
      </Link>
    </motion.div>
  );
};
