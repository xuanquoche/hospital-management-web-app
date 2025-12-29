import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { Patient } from './PatientTable';

interface PatientDetailPanelProps {
  patient: Patient | null;
}

export function PatientDetailPanel({ patient }: PatientDetailPanelProps) {
  if (!patient) {
    return (
      <Card className='h-full'>
        <CardContent className='flex h-full items-center justify-center text-muted-foreground'>
          Select a patient to view details
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='h-fit'>
      <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-2'>
        <div>
          <CardTitle className='text-base font-semibold'>
            Patient details
          </CardTitle>
          <p className='text-muted-foreground text-xs'>
            Hồ sơ tổng quát của bệnh nhân được chọn
          </p>
        </div>
        <Button
          variant='link'
          className='text-muted-foreground h-auto p-0 text-xs'
        >
          View full
        </Button>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Header */}
        <div className='flex items-start gap-4'>
          <Avatar className='size-12'>
            <AvatarImage src={patient.avatarUrl} alt={patient.name} />
            <AvatarFallback>{patient.name?.charAt(0) ?? 'P'}</AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <h3 className='font-semibold'>{patient.name}</h3>
            <p className='text-muted-foreground text-xs'>
              {patient.pid} · {patient.dob} · {patient.gender}
            </p>
            <div className='flex flex-wrap gap-2'>
              {patient.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='secondary'
                  className='bg-slate-100 text-slate-700 hover:bg-slate-100/80 text-[10px] px-1.5 py-0 h-5'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className='grid grid-cols-2 gap-4 text-xs'>
          <div>
            <p className='text-muted-foreground'>Số điện thoại</p>
            <p className='font-medium'>{patient.phone}</p>
          </div>
          <div>
            <p className='text-muted-foreground'>Email</p>
            <p className='font-medium truncate' title={patient.email}>
              {patient.email}
            </p>
          </div>
          <div className='col-span-2'>
            <p className='text-muted-foreground'>Địa chỉ</p>
            <p className='font-medium'>{patient.address}</p>
          </div>
          <div>
            <p className='text-muted-foreground'>Người liên hệ khẩn cấp</p>
            <p className='font-medium'>{patient.emergencyContact || 'N/A'}</p>
          </div>
          <div>
            <p className='text-muted-foreground'>Bảo hiểm</p>
            <p className='font-medium'>{patient.insuranceProvider}</p>
          </div>
          <div>
            <p className='text-muted-foreground'>Mã BH</p>
            <p className='font-medium'>{patient.insuranceNumber}</p>
          </div>
        </div>

        <Separator />

        {/* Status */}
        <div className='space-y-2'>
          <p className='text-muted-foreground text-xs uppercase tracking-wider'>
            TÌNH TRẠNG HỒ SƠ
          </p>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Badge
                variant={patient.status === 'Active' ? 'default' : 'secondary'}
                className={
                  patient.status === 'Active'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : ''
                }
              >
                {patient.status}
              </Badge>
              <span className='text-muted-foreground text-xs'>
                Created at quầy lễ tân
              </span>
            </div>
            <Button variant='ghost' size='sm' className='h-auto p-0 text-xs'>
              Edit
            </Button>
          </div>
        </div>

        <Separator />

        {/* Visit History */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-semibold'>Lịch sử khám (tổng quát)</h4>
            <Button
              variant='link'
              className='text-muted-foreground h-auto p-0 text-xs'
            >
              View all
            </Button>
          </div>
          <p className='text-muted-foreground text-xs'>3 lần khám gần nhất</p>
          <div className='space-y-4'>
            {patient.visitHistory.map((visit, index) => (
              <div key={index} className='flex items-start justify-between'>
                <div className='space-y-0.5'>
                  <p className='text-xs font-medium'>
                    {visit.date} · {visit.type}
                  </p>
                  <p className='text-muted-foreground text-[10px]'>
                    Follow-up · {visit.doctor}
                  </p>
                </div>
                <Badge
                  variant='secondary'
                  className='bg-slate-100 text-slate-500 hover:bg-slate-100/80 text-[10px] px-1.5 py-0 h-5 font-normal'
                >
                  {visit.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Internal Notes */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h4 className='text-sm font-semibold'>Ghi chú nội bộ</h4>
            <Button
              variant='link'
              className='text-muted-foreground h-auto p-0 text-xs'
            >
              Update
            </Button>
          </div>
          <p className='text-muted-foreground text-xs'>
            Chỉ hiển thị cho Admin & Bác sĩ
          </p>
          <p className='text-muted-foreground text-xs leading-relaxed'>
            Nhắc bệnh nhân mang sổ đo huyết áp mỗi lần tái khám. Tránh đặt lịch
            buổi sáng quá sớm (ưu tiên sau 9:00).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
