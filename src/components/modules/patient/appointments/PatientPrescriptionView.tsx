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
import { ConsultationHistoryResponse } from '@/types/patient-dashboard';

interface PatientPrescriptionViewProps {
  appointmentId: string;
  className?: string;
}

export function PatientPrescriptionView({
  appointmentId,
  className,
}: PatientPrescriptionViewProps) {
  // We'll store the prescription items directly
  const [items, setItems] = useState<
    Array<{
      id: string;
      quantity: number;
      dosage: string;
      instructions: string;
      medicineBatch: {
        medicine: {
          name: string;
        };
      };
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultation = async () => {
      if (!appointmentId) return;

      try {
        setLoading(true);
        // Using the endpoint provided by user instructions
        // Note: The user specified the type ConsultationHistoryResponse which contains data: ConsultationHistory[]
        // But typically a detail endpoint returns a single object.
        // We will handle assuming the response structure matches the type provided.
        const res = await clientFetcher.get<ConsultationHistoryResponse>(
          `/patients/me/consultations/${appointmentId}`
        );

        if (res.data) {
          // Handle if data is array (as per type) or single object (if API behaves like a detail endpoint)
          const consultation = Array.isArray(res.data) ? res.data[0] : res.data;

          if (consultation && consultation.prescriptionItems) {
            setItems(consultation.prescriptionItems);
          }
          setTimestamp(res.timestamp);
        }
      } catch (err) {
        console.error('Failed to fetch consultation prescription:', err);
        setError('Không thể tải thông tin đơn thuốc.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultation();
  }, [appointmentId]);

  if (loading) {
    return (
      <div className='flex h-40 items-center justify-center rounded-xl border bg-white/50'>
        <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
        <span className='ml-2 text-sm text-muted-foreground'>
          Đang tải đánh giá...
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

  if (!items || items.length === 0) {
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
                  Tên thuốc
                </TableHead>
                <TableHead className='font-semibold text-slate-700'>
                  Liều lượng
                </TableHead>
                <TableHead className='font-semibold text-slate-700'>
                  SL
                </TableHead>
                <TableHead className='font-semibold text-slate-700'>
                  Hướng dẫn
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id} className='hover:bg-slate-50/50'>
                  <TableCell className='font-medium text-slate-500'>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <span className='font-semibold text-teal-700'>
                      {item.medicineBatch.medicine.name}
                    </span>
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
                    </span>
                  </TableCell>
                  <TableCell className='text-slate-600'>
                    {item.instructions || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-between border-t bg-slate-50/50 px-6 py-3 text-xs text-slate-500'>
          <span>
            Thời gian:{' '}
            {timestamp ? new Date(timestamp).toLocaleString('vi-VN') : '---'}
          </span>
          <div className='flex gap-4'>
            <span>* Thực hiện đúng chỉ định của bác sĩ</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
