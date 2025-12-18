import { Plus, CreditCard, Landmark, QrCode } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { PaymentMethod } from './data';

interface PaymentMethodsCardProps {
  methods: PaymentMethod[];
}

export const PaymentMethodsCard = ({ methods }: PaymentMethodsCardProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <CreditCard className='w-5 h-5 text-slate-600' />;
      case 'bank':
        return <Landmark className='w-5 h-5 text-slate-600' />;
      case 'wallet':
        return <QrCode className='w-5 h-5 text-slate-600' />;
      default:
        return <CreditCard className='w-5 h-5 text-slate-600' />;
    }
  };

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6'>
      <div className='mb-4'>
        <h3 className='text-lg font-bold text-slate-900'>Phương thức thanh toán</h3>
        <p className='text-sm text-slate-500'>Chọn hoặc thêm phương thức bạn muốn sử dụng.</p>
      </div>

      <div className='space-y-3 mb-4'>
        {methods.map((method) => (
          <div key={method.id} className='flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100'>
            <div className='p-2 bg-white rounded-lg border border-slate-100'>{getIcon(method.type)}</div>
            <div className='flex-1'>
              <div className='flex justify-between items-start'>
                <p className='text-sm font-bold text-slate-900'>{method.name}</p>
                {method.isDefault && (
                  <Badge variant='secondary' className='bg-teal-50 text-teal-700 hover:bg-teal-100 text-[10px] h-5'>
                    Mặc định
                  </Badge>
                )}
              </div>
              <p className='text-xs text-slate-500 mt-0.5'>{method.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant='outline'
        className='w-full text-teal-600 border-teal-100 hover:bg-teal-50 hover:text-teal-700 bg-teal-50/50'
      >
        <Plus className='w-4 h-4 mr-2' />
        Thêm phương thức mới
      </Button>
    </div>
  );
};
