'use client';

import { FileText, Loader2, Pill } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { clientFetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';

interface PrescriptionMedicine {
  name: string;
  code: string;
  activeIngredient: string;
  unit: string;
  dosage: string;
}

interface PrescriptionBatch {
  medicine: PrescriptionMedicine;
}

export interface PrescriptionItem {
  id: string;
  quantity: number;
  dosage: string;
  instructions: string;
  unitPrice: number;
  totalPrice: number;
  medicineBatch: PrescriptionBatch;
}

interface PrescriptionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: PrescriptionItem[];
  timestamp: string;
}

interface PrescriptionDetailViewProps {
  appointmentId: string;
  className?: string; // For additional styling flexibility
}

export function PrescriptionDetailView({
  appointmentId,
  className,
}: PrescriptionDetailViewProps) {
  const [data, setData] = useState<PrescriptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      if (!appointmentId) return;

      try {
        setLoading(true);
        const res = await clientFetcher.get<PrescriptionResponse>(
          `/doctors/me/appointments/${appointmentId}/prescription`
        );
        if (res.data) {
          setData(res.data);
          setTimestamp(res.timestamp);
        }
      } catch (err) {
        console.error('Failed to fetch prescription:', err);
        setError('Không thể tải thông tin đơn thuốc.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [appointmentId]);

  if (loading) {
    return (
      <div className='flex h-40 items-center justify-center rounded-xl border bg-white/50'>
        <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
        <span className='ml-2 text-sm text-muted-foreground'>
          Đang tải đơn thuốc...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50/50 p-4 text-center'>
        <div className='rounded-full bg-red-100 p-2'>
          <FileText className='h-5 w-5 text-red-500' />
        </div>
        <p className='text-sm text-red-600'>{error}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='flex h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-slate-50/50 p-6 text-center'>
        <div className='rounded-full bg-slate-100 p-3'>
          <Pill className='h-6 w-6 text-slate-400' />
        </div>
        <div className='space-y-1'>
          <h3 className='font-medium text-slate-900'>Chưa có đơn thuốc</h3>
          <p className='text-sm text-slate-500'>
            Bác sĩ chưa kê đơn cho lần khám này.
          </p>
        </div>
      </div>
    );
  }

  const grandTotal = data.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <Card
      className={cn('overflow-hidden border-slate-200 shadow-sm', className)}
    >
      <CardHeader className='border-b bg-teal-50/30 px-6 py-4'>
        <div className='flex items-center gap-3'>
          <div className='rounded-lg bg-teal-100 p-2'>
            <FileText className='h-5 w-5 text-teal-700' />
          </div>
          <div>
            <CardTitle className='text-lg font-semibold text-slate-900'>
              Đơn thuốc (Prescription)
            </CardTitle>
            <p className='text-sm text-slate-500'>
              Chi tiết các loại thuốc được chỉ định
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader className='bg-slate-50'>
              <TableRow>
                <TableHead className='w-[50px] font-semibold text-slate-700'>
                  #
                </TableHead>
                <TableHead className='min-w-[200px] font-semibold text-slate-700'>
                  Tên thuốc / Hoạt chất
                </TableHead>
                <TableHead className='font-semibold text-slate-700'>
                  Liều lượng
                </TableHead>
                <TableHead className='font-semibold text-slate-700'>
                  SL
                </TableHead>
                <TableHead className='text-right font-semibold text-slate-700'>
                  Đơn giá
                </TableHead>
                <TableHead className='text-right font-semibold text-slate-700'>
                  Thành tiền
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id} className='hover:bg-slate-50/50'>
                  <TableCell className='font-medium text-slate-500'>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <span className='font-semibold text-teal-700'>
                        {item.medicineBatch.medicine.name}
                      </span>
                      <div className='flex flex-wrap gap-2 text-xs text-slate-500'>
                        <span className='rounded-full bg-slate-100 px-2 py-0.5'>
                          {item.medicineBatch.medicine.code}
                        </span>
                        <span>
                          {item.medicineBatch.medicine.activeIngredient}
                        </span>
                        <span className='text-slate-300'>•</span>
                        <span>{item.medicineBatch.medicine.dosage}</span>
                      </div>
                      {item.instructions && (
                        <div className='mt-1 rounded-md bg-amber-50 px-2 py-1.5 text-xs text-amber-700'>
                          <span className='font-medium'>Lưu ý: </span>
                          {item.instructions}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant='outline'
                      className='border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100'
                    >
                      {item.dosage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className='font-medium text-slate-900'>
                      {item.quantity}
                    </span>{' '}
                    <span className='text-xs text-slate-500'>
                      ({item.medicineBatch.medicine.unit})
                    </span>
                  </TableCell>
                  <TableCell className='text-right font-medium text-slate-600'>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(item.unitPrice)}
                  </TableCell>
                  <TableCell className='text-right font-bold text-slate-900'>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(item.totalPrice)}
                  </TableCell>
                </TableRow>
              ))}
              {/* Summary Row */}
              <TableRow className='bg-slate-50 hover:bg-slate-50'>
                <TableCell colSpan={4} />
                <TableCell className='text-right font-semibold text-slate-700'>
                  Tổng cộng:
                </TableCell>
                <TableCell className='text-right text-lg font-bold text-teal-700'>
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(grandTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-between border-t bg-slate-50/50 px-6 py-3 text-xs text-slate-500'>
          <span>
            Thời gian:{' '}
            {timestamp ? new Date(timestamp).toLocaleString('vi-VN') : '---'}
          </span>
          <div className='flex gap-4'>
            <span>* Giá đã bao gồm VAT (nếu có)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
