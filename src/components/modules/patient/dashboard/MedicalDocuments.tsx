'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { Button } from '@/components/ui/button';

const documents = [
  {
    name: 'Xét nghiệm máu tổng quát',
    type: 'PDF',
    size: '1.2MB',
  },
  {
    name: 'Phim X-quang ngực',
    type: 'Ảnh',
    size: '2 file',
  },
  {
    name: 'MRI cột sống thắt lưng',
    type: 'DICOM',
    size: '560MB',
  },
];

export const MedicalDocuments = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'
    >
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>Tài liệu y khoa</h3>
        <p className='text-slate-500'>Kết quả xét nghiệm, phim X-quang, MRI.</p>
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
              {doc.type} • {doc.size}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant='secondary'
        className='w-full bg-teal-50 text-teal-700 hover:bg-teal-100'
      >
        Quản lý tài liệu
      </Button>
    </motion.div>
  );
};
