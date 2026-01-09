import { format } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface PaymentQRModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
  amount: number;
  description: string;
  doctorName: string;
  appointmentDate: Date;
  timeSlot: string;
}

export const PaymentQRModal = ({
  open,
  onOpenChange,
  onComplete,
  amount,
  description,
  doctorName,
  appointmentDate,
  timeSlot,
}: PaymentQRModalProps) => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    if (!open) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
      .format(value)
      .replace('₫', 'đ');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Đã sao chép nội dung chuyển khoản');
  };

  // User provided URL params: acc=10002976003&bank=TPBank
  const bankName = 'TPBank';
  const accountNumber = '10002976003';
  const accountName = 'Hoang Van Nhat';
  const qrUrl = `https://qr.sepay.vn/img?acc=${accountNumber}&bank=${bankName}&amount=${amount}&des=${description}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[900px] p-0 overflow-hidden gap-0 border-none rounded-2xl'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Left Column: Payment Details */}
          <div className='p-8 bg-white'>
            <DialogTitle className='text-2xl font-bold text-slate-900 mb-2'>
              Thanh toán đơn khám
            </DialogTitle>
            <p className='text-slate-500 mb-8'>
              Vui lòng hoàn tất thanh toán để xác nhận lịch hẹn.
            </p>

            <div className='space-y-6'>
              <div>
                <p className='text-sm text-slate-500 mb-1'>
                  Số tiền cần thanh toán
                </p>
                <p className='text-3xl font-bold text-teal-600'>
                  {formatCurrency(amount)}
                </p>
              </div>

              <div>
                <p className='text-sm text-slate-500 mb-1'>
                  Nội dung chuyển khoản
                </p>
                <div className='flex items-center gap-2'>
                  <span className='font-bold text-slate-900'>
                    {description}
                  </span>
                  <button
                    onClick={() => handleCopy(description)}
                    className='text-xs text-teal-600 font-medium hover:underline flex items-center gap-1'
                  >
                    Sao chép
                  </button>
                </div>
                <p className='text-xs text-orange-500 mt-1 flex items-center gap-1'>
                  <span className='w-3 h-3 rounded-full border border-orange-500 flex items-center justify-center text-[8px]'>
                    !
                  </span>
                  Vui lòng nhập chính xác nội dung này
                </p>
              </div>

              <div>
                <p className='text-sm text-slate-500 mb-1'>
                  Thông tin đơn khám
                </p>
                <p className='font-medium text-slate-900'>BS. {doctorName}</p>
                <p className='text-sm text-slate-500'>
                  {timeSlot}, {format(appointmentDate, 'dd/MM/yyyy')}
                </p>
              </div>

              <Button
                className='w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-base mt-4'
                onClick={onComplete}
              >
                Đã thanh toán xong
              </Button>

              <button
                className='w-full text-center text-sm text-slate-600 hover:text-slate-900 font-medium mt-2'
                onClick={() => onOpenChange(false)}
              >
                Chọn phương thức khác
              </button>
            </div>
          </div>

          {/* Right Column: QR Code */}
          <div className='p-8 bg-teal-50/50 flex flex-col items-center justify-center text-center relative'>
            <div className='absolute top-6 left-0 w-full flex justify-center'>
              <div className='bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2'>
                <span>⏱</span>
                Đơn hàng hết hạn sau {formatTime(timeLeft)}
              </div>
            </div>

            <div className='mt-8 mb-6'>
              <div className='flex items-center justify-center gap-2 text-teal-700 font-bold mb-4 uppercase'>
                <span className='text-xl'>🏦</span>
                {bankName}
              </div>
              <div className='bg-white p-4 rounded-xl shadow-sm inline-block'>
                {}
                <Image
                  src={qrUrl}
                  alt='Payment QR Code'
                  className='w-48 h-48 object-contain'
                  width={192}
                  height={192}
                />
              </div>
            </div>

            <div className='w-full max-w-xs space-y-3 text-sm'>
              <div className='flex justify-between'>
                <span className='text-slate-500'>Chủ tài khoản:</span>
                <span className='font-bold text-slate-900 uppercase'>
                  {accountName}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-slate-500'>Số tài khoản:</span>
                <span className='font-bold text-slate-900'>
                  {accountNumber}
                </span>
              </div>
            </div>

            <p className='text-xs text-slate-500 mt-8 max-w-xs'>
              Mở ứng dụng ngân hàng bất kỳ trên điện thoại của bạn để quét mã
              QR.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
