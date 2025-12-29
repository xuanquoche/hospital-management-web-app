import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { clientFetcher } from '@/lib/fetcher';
import { Payment, PaymentStatus } from '@/types/payment';

interface PaymentDetailModalProps {
  paymentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentDetailModal({ paymentId, open, onOpenChange }: PaymentDetailModalProps) {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && paymentId) {
      const fetchPaymentDetail = async () => {
        setLoading(true);
        try {
          const res = await clientFetcher.get<any>(`/admin/payments/${paymentId}`);
          console.log('Payment detail:', res.data);
          if (res.data) {
            setPayment(res.data);
          }
        } catch (error) {
          console.error('Failed to fetch payment detail:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPaymentDetail();
    } else {
      setPayment(null);
    }
  }, [open, paymentId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[80%] max-h-[90vh]'>
        <DialogHeader>
          <DialogTitle>Chi tiết thanh toán</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className='flex items-center justify-center py-8'>Loading...</div>
        ) : payment ? (
          <div className='space-y-6'>
            {/* Header Status */}
            <div className='flex items-center justify-between bg-slate-50 p-4 rounded-lg'>
              <div>
                <p className='text-sm text-muted-foreground'>Mã thanh toán</p>
                <p className='text-lg font-bold text-slate-900'>{payment.paymentCode}</p>
              </div>
              <Badge
                variant='secondary'
                className={`text-sm px-3 py-1 ${
                  payment.status === PaymentStatus.SUCCESS
                    ? 'bg-emerald-100 text-emerald-700'
                    : payment.status === PaymentStatus.PENDING
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {payment.status}
              </Badge>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Payment Info */}
              <div className='space-y-4'>
                <h3 className='font-semibold text-slate-900 flex items-center gap-2'>
                  <span className='size-2 rounded-full bg-teal-500' />
                  Thông tin giao dịch
                </h3>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <p className='text-muted-foreground'>Phương thức</p>
                    <p className='font-medium'>{payment.method}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Số tiền</p>
                    <p className='font-medium text-emerald-600'>
                      {formatCurrency(payment.appointment.consultationFee)}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Ngày tạo</p>
                    <p className='font-medium'>{format(new Date(payment.createdAt), 'dd/MM/yyyy HH:mm')}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Cập nhật cuối</p>
                    <p className='font-medium'>{format(new Date(payment.updatedAt), 'dd/MM/yyyy HH:mm')}</p>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              <div className='space-y-4'>
                <h3 className='font-semibold text-slate-900 flex items-center gap-2'>
                  <span className='size-2 rounded-full bg-blue-500' />
                  Thông tin bệnh nhân
                </h3>
                <div className='flex items-center gap-3'>
                  <Avatar className='size-12'>
                    <AvatarImage
                      src={payment.appointment.patient.user.avatar}
                      alt={payment.appointment.patient.user.fullName}
                    />
                    <AvatarFallback>{payment.appointment.patient.user.fullName?.charAt(0) ?? 'P'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{payment.appointment.patient.user.fullName}</p>
                    <p className='text-sm text-muted-foreground'>{payment.appointment.patient.user.phone}</p>
                    {payment.appointment.patient.user.email && (
                      <p className='text-sm text-muted-foreground'>{payment.appointment.patient.user.email}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Appointment Info */}
            <div className='space-y-4'>
              <h3 className='font-semibold text-slate-900 flex items-center gap-2'>
                <span className='size-2 rounded-full bg-purple-500' />
                Chi tiết lịch hẹn
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-sm'>
                <div className='space-y-3'>
                  <div>
                    <p className='text-muted-foreground'>Bác sĩ phụ trách</p>
                    <p className='font-medium'>
                      {payment.appointment.doctor.professionalTitle &&
                        `${payment.appointment.doctor.professionalTitle}. `}
                      {payment.appointment.doctor.user.fullName}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Thời gian khám</p>
                    <p className='font-medium'>{format(new Date(payment.appointment.appointmentDate), 'dd/MM/yyyy')}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Loại hình khám</p>
                    <Badge variant='outline'>{payment.appointment.examinationType}</Badge>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div>
                    <p className='text-muted-foreground'>Triệu chứng</p>
                    <p className='font-medium'>{payment.appointment.symptoms || 'Không có'}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground'>Ghi chú</p>
                    <p className='font-medium'>{payment.appointment.notes || 'Không có'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end pt-4'>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Đóng
              </Button>
            </div>
          </div>
        ) : (
          <div className='text-center py-8 text-muted-foreground'>Không tìm thấy thông tin thanh toán</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
