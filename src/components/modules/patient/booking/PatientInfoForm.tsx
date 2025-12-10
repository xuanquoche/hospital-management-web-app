'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const PatientInfoForm = () => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>
          Thông tin bệnh nhân
        </h3>
        <p className='text-sm text-slate-500'>
          Chọn đúng người sẽ đi khám để bệnh viện chuẩn bị hồ sơ.
        </p>
      </div>

      <div className='mb-6 flex items-center justify-between'>
        <Label className='text-sm font-medium text-slate-700'>
          Đối tượng khám
        </Label>
        <span className='text-xs text-slate-400'>
          Bạn có thể đặt giúp người thân
        </span>
      </div>

      <div className='mb-8 flex gap-3'>
        <Button
          variant='default'
          className='bg-teal-600 text-white hover:bg-teal-700'
        >
          Nguyễn Minh Anh (Tôi)
        </Button>
        <Button
          variant='outline'
          className='border-slate-200 text-slate-600 hover:bg-slate-50'
        >
          Bố / Mẹ
        </Button>
        <Button
          variant='outline'
          className='border-slate-200 text-slate-600 hover:bg-slate-50'
        >
          Con
        </Button>
        <Button
          variant='outline'
          className='border-slate-200 text-slate-600 hover:bg-slate-50'
        >
          Khác
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>
              Họ và tên
            </Label>
            <span className='text-xs text-slate-400'>Bắt buộc</span>
          </div>
          <Input
            defaultValue='Nguyễn Minh Anh'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>

        <div className='space-y-2'>
          <Label className='text-sm font-medium text-slate-700'>
            Giới tính
          </Label>
          <Select defaultValue='female'>
            <SelectTrigger className='border-slate-200 focus:ring-teal-500'>
              <SelectValue placeholder='Chọn giới tính' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='male'>Nam</SelectItem>
              <SelectItem value='female'>Nữ</SelectItem>
              <SelectItem value='other'>Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label className='text-sm font-medium text-slate-700'>
            Ngày sinh
          </Label>
          <div className='relative'>
            <Input
              defaultValue='12/03/1995'
              className='border-slate-200 pl-10 focus-visible:ring-teal-500'
            />
            <CalendarIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>
              Số CMND / CCCD
            </Label>
            <span className='text-xs text-slate-400'>Không bắt buộc</span>
          </div>
          <Input
            placeholder='Nhập số CMND / CCCD (nếu có)...'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>
              Chiều cao
            </Label>
            <span className='text-xs text-slate-400'>cm</span>
          </div>
          <Input
            placeholder='Ví dụ: 160'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>
              Cân nặng
            </Label>
            <span className='text-xs text-slate-400'>kg</span>
          </div>
          <Input
            placeholder='Ví dụ: 52'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>
      </div>

      <div className='mt-6 space-y-2'>
        <div className='flex justify-between'>
          <Label className='text-sm font-medium text-slate-700'>
            Tiền sử bệnh lý quan trọng
          </Label>
          <span className='text-xs text-slate-400'>
            Ví dụ: tăng huyết áp, đái tháo đường...
          </span>
        </div>
        <Textarea
          placeholder='Ghi rõ các bệnh mạn tính, phẫu thuật lớn đã từng thực hiện, dị ứng thuốc (nếu có)...'
          className='min-h-[80px] resize-none border-slate-200 focus-visible:ring-teal-500'
        />
      </div>
    </div>
  );
};
