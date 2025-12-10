'use client';

import { motion } from 'framer-motion';
import React from 'react';

const specialties = [
  {
    id: 1,
    name: 'Nội tổng quát',
    description: 'Khám sức khỏe tổng quát, tư vấn ban đầu',
    active: true,
  },
  {
    id: 2,
    name: 'Tim mạch',
    description: 'Đau ngực, khó thở, cao huyết áp',
    active: false,
  },
  {
    id: 3,
    name: 'Tai Mũi Họng',
    description: 'Ho kéo dài, nghẹt mũi, viêm họng',
    active: false,
  },
  {
    id: 4,
    name: 'Nhi khoa',
    description: 'Khám cho trẻ em & tiêm chủng',
    active: false,
  },
  {
    id: 5,
    name: 'Da liễu',
    description: 'Các bệnh về da, tóc, móng',
    active: false,
  },
];

export const SpecialtyList = () => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm h-full'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>
          Chọn theo chuyên khoa
        </h3>
        <p className='text-slate-500'>
          Hoặc chọn chuyên khoa trước, sau đó chọn bác sĩ.
        </p>
      </div>

      <div className='space-y-3'>
        {specialties.map((specialty) => (
          <motion.div
            key={specialty.id}
            whileHover={{ scale: 1.01 }}
            className={`cursor-pointer rounded-lg border p-4 transition-all ${
              specialty.active
                ? 'border-teal-200 bg-teal-50 shadow-sm'
                : 'border-slate-100 bg-slate-50/50 hover:border-teal-100 hover:bg-white hover:shadow-sm'
            }`}
          >
            <h4
              className={`font-bold ${
                specialty.active ? 'text-teal-800' : 'text-slate-700'
              }`}
            >
              {specialty.name}
            </h4>
            <p
              className={`text-sm ${
                specialty.active ? 'text-teal-600' : 'text-slate-500'
              }`}
            >
              {specialty.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
