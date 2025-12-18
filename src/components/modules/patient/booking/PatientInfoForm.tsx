'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppointmentStore, PatientInfo } from '@/store/use-appointment-store';
export const PatientInfoForm = () => {
  const { patientInfo, setPatientInfo } = useAppointmentStore();

  console.log('patientInfo', patientInfo);

  useEffect(() => {
    if (!patientInfo) {
      setPatientInfo({
        fullName: '',
        dateOfBirth: '',
        gender: 'female',
        phone: '',
        email: '',
        address: '',
        insuranceNumber: '',
      });
    }
  }, [patientInfo, setPatientInfo]);

  const handleChange = (field: keyof PatientInfo, value: string) => {
    if (patientInfo) {
      setPatientInfo({
        ...patientInfo,
        [field]: value,
      });
    }
  };

  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>Thông tin bệnh nhân</h3>
        <p className='text-sm text-slate-500'>Chọn đúng người sẽ đi khám để bệnh viện chuẩn bị hồ sơ.</p>
      </div>

      <div className='mb-6 flex items-center justify-between'>
        <Label className='text-sm font-medium text-slate-700'>Đối tượng khám</Label>
        <span className='text-xs text-slate-400'>Bạn có thể đặt giúp người thân</span>
      </div>

      <div className='mb-8 flex gap-3'>
        <Button variant='default' className='bg-teal-600 text-white hover:bg-teal-700'>
          Tôi
        </Button>
        <Button variant='outline' className='border-slate-200 text-slate-600 hover:bg-slate-50'>
          Người thân
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>Họ và tên</Label>
            <span className='text-xs text-slate-400'>Bắt buộc</span>
          </div>
          <Input
            value={patientInfo?.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>

        <div className='space-y-2'>
          <Label className='text-sm font-medium text-slate-700'>Giới tính</Label>
          <Select value={patientInfo?.gender || 'MALE'} onValueChange={(value) => handleChange('gender', value)}>
            <SelectTrigger className='border-slate-200 focus:ring-teal-500'>
              <SelectValue placeholder='Chọn giới tính' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='MALE'>Nam</SelectItem>
              <SelectItem value='FEMALE'>Nữ</SelectItem>
              <SelectItem value='OTHER'>Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label className='text-sm font-medium text-slate-700'>Ngày sinh</Label>
          <div className='relative'>
            <Input
              value={patientInfo?.dateOfBirth || ''}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              placeholder='DD/MM/YYYY'
              className='border-slate-200 pl-10 focus-visible:ring-teal-500'
            />
            <CalendarIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>Số điện thoại</Label>
            <span className='text-xs text-slate-400'>Bắt buộc</span>
          </div>
          <Input
            value={patientInfo?.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>Email</Label>
          </div>
          <Input
            value={patientInfo?.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>Địa chỉ</Label>
          </div>
          <Input
            value={patientInfo?.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>
      </div>
    </div>
  );
};
