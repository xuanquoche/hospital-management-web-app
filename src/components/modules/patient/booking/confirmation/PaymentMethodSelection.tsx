import { Wallet, Banknote } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';
import { useAppointmentStore } from '@/store/use-appointment-store';
import { PaymentMethod as PaymentMethodEnum } from '@/types/payment';

export const PaymentMethodSelection = () => {
  const { paymentMethod, setPaymentMethod } = useAppointmentStore();

  interface PaymentMethod {
    id: PaymentMethodEnum;
    title: string;
    description: string;
    icon: React.ElementType;
    badge?: string;
  }

  const methods: PaymentMethod[] = [
    {
      id: PaymentMethodEnum.BANK_TRANSFER,
      title: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản trực tiếp qua STK.',
      icon: Banknote,
    },
    {
      id: PaymentMethodEnum.CASH,
      title: 'Thanh toán tại quầy',
      description: 'Thanh toán khi đến bệnh viện.',
      icon: Wallet,
    },
  ];

  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm border border-slate-100'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>
          Hình thức thanh toán
        </h3>
        <span className='text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full'>
          Thanh toán an toàn
        </span>
      </div>

      <p className='text-sm text-slate-500 mb-6'>
        Chọn một trong các phương thức sau.
      </p>

      <div className='space-y-3'>
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={cn(
              'relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
              paymentMethod === method.id
                ? 'border-teal-500 bg-teal-50/50'
                : 'border-slate-100 hover:border-teal-200 hover:bg-slate-50'
            )}
          >
            <div
              className={cn(
                'p-3 rounded-lg mr-4',
                paymentMethod === method.id
                  ? 'bg-teal-100 text-teal-600'
                  : 'bg-slate-100 text-slate-500'
              )}
            >
              <method.icon className='w-6 h-6' />
            </div>

            <div className='flex-1'>
              <h4
                className={cn(
                  'text-sm font-bold',
                  paymentMethod === method.id
                    ? 'text-teal-900'
                    : 'text-slate-900'
                )}
              >
                {method.title}
              </h4>
              <p className='text-xs text-slate-500 mt-0.5'>
                {method.description}
              </p>
            </div>

            {method.badge && (
              <span className='absolute top-4 right-4 text-[10px] font-bold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full'>
                {method.badge}
              </span>
            )}

            <div
              className={cn(
                'w-5 h-5 rounded-full border-2 ml-4 flex items-center justify-center',
                paymentMethod === method.id
                  ? 'border-teal-500'
                  : 'border-slate-300'
              )}
            >
              {paymentMethod === method.id && (
                <div className='w-2.5 h-2.5 rounded-full bg-teal-500' />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
