'use client';

import { CreditCard, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PaymentQRModal } from '@/components/modules/patient/booking/confirmation/PaymentQRModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PrescriptionPaymentSectionProps {
  appointmentId: string;
  medicineFee: number;
  totalFee: number;
  paymentCode: string;
  doctorName: string;
  appointmentDate: string;
  timeSlot: string;
}

export function PrescriptionPaymentSection({
  medicineFee,
  paymentCode,
  doctorName,
  appointmentDate,
  timeSlot,
}: PrescriptionPaymentSectionProps) {
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
      .format(value)
      .replace('₫', 'đ');
  };

  const handlePaymentComplete = () => {
    setShowQR(false);
    router.refresh();
  };

  return (
    <>
      <Card className='overflow-hidden border-amber-200 bg-amber-50/50 shadow-sm'>
        <CardContent className='flex flex-col items-center justify-center gap-4 py-12'>
          <div className='rounded-full bg-amber-100 p-4'>
            <Lock className='h-8 w-8 text-amber-600' />
          </div>
          <div className='space-y-2 text-center'>
            <h3 className='text-lg font-semibold text-amber-900'>
              Vui lòng thanh toán để xem đơn thuốc
            </h3>
            <p className='max-w-md text-sm text-amber-700'>
              Bác sĩ đã kê đơn thuốc cho bạn. Để xem chi tiết đơn thuốc, vui
              lòng hoàn tất thanh toán tiền thuốc.
            </p>
          </div>

          <div className='rounded-lg bg-amber-100/80 px-6 py-3 text-center'>
            <p className='text-sm text-amber-700'>Số tiền cần thanh toán</p>
            <p className='text-2xl font-bold text-amber-900'>
              {formatCurrency(medicineFee)}
            </p>
          </div>

          <Button
            onClick={() => setShowQR(true)}
            className='mt-2 bg-amber-600 hover:bg-amber-700 text-white'
            size='lg'
          >
            <CreditCard className='mr-2 h-5 w-5' />
            Thanh toán ngay
          </Button>
        </CardContent>
      </Card>

      <PaymentQRModal
        open={showQR}
        onOpenChange={setShowQR}
        onComplete={handlePaymentComplete}
        amount={medicineFee}
        description={paymentCode}
        doctorName={doctorName}
        appointmentDate={new Date(appointmentDate)}
        timeSlot={timeSlot}
      />
    </>
  );
}
