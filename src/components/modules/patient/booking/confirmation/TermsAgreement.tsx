import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';

export const TermsAgreement = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <h3 className='text-lg font-bold text-slate-900 mb-4'>
        Điều khoản & xác nhận
      </h3>
      <p className='text-sm text-slate-500 mb-4'>
        Đồng ý với chính sách đặt lịch của bệnh viện.
      </p>

      <div className='space-y-4'>
        <div className='flex items-start space-x-2'>
          <Checkbox
            id='policy-agree'
            defaultChecked
            className='mt-1 border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600'
          />
          <label
            htmlFor='policy-agree'
            className='text-sm leading-relaxed text-slate-600'
          >
            Tôi đã đọc và đồng ý với{' '}
            <a
              href='#'
              className='text-slate-900 underline decoration-slate-400 underline-offset-2 hover:text-teal-600'
            >
              Quy định đặt lịch & chính sách hủy
            </a>
            .
          </label>
        </div>

        <div className='flex items-start space-x-2'>
          <Checkbox
            id='contact-agree'
            defaultChecked
            className='mt-1 border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600'
          />
          <label
            htmlFor='contact-agree'
            className='text-sm leading-relaxed text-slate-600'
          >
            Tôi đồng ý để bệnh viện liên hệ qua số điện thoại / email đã cung
            cấp.
          </label>
        </div>
      </div>
    </div>
  );
};
