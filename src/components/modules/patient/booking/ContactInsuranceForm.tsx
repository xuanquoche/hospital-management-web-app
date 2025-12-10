'use client';

import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ContactInsuranceForm = () => {
  return (
    <div className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>
          Thông tin liên hệ & bảo hiểm
        </h3>
        <p className='text-sm text-slate-500'>
          Dùng để gửi mã xác nhận và xuất hóa đơn.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>
              Số điện thoại liên hệ
            </Label>
            <span className='text-xs text-slate-400'>Bắt buộc</span>
          </div>
          <Input
            defaultValue='(+84) 912 345 678'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>

        <div className='space-y-2'>
          <Label className='text-sm font-medium text-slate-700'>
            Email nhận thông tin
          </Label>
          <Input
            defaultValue='minh.anh@example.com'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>
      </div>

      <div className='mt-6 space-y-2'>
        <div className='flex justify-between'>
          <Label className='text-sm font-medium text-slate-700'>
            Địa chỉ hiện tại
          </Label>
          <span className='text-xs text-slate-400'>
            Phục vụ cho việc xuất hóa đơn / liên hệ
          </span>
        </div>
        <Input
          placeholder='Nhập số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố...'
          className='border-slate-200 focus-visible:ring-teal-500'
        />
      </div>

      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label className='text-sm font-medium text-slate-700'>
            Bảo hiểm y tế
          </Label>
          <Select defaultValue='bhyt'>
            <SelectTrigger className='border-slate-200 focus:ring-teal-500'>
              <SelectValue placeholder='Chọn loại bảo hiểm' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='bhyt'>
                BHYT - Bảo hiểm y tế nhà nước
              </SelectItem>
              <SelectItem value='private'>Bảo hiểm tư nhân</SelectItem>
              <SelectItem value='none'>Không có</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>
              Mã số thẻ BHYT
            </Label>
            <span className='text-xs text-slate-400'>Nếu sử dụng BHYT</span>
          </div>
          <Input
            placeholder='Nhập mã số thẻ bảo hiểm...'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label className='text-sm font-medium text-slate-700'>
            Liên hệ khẩn cấp (tùy chọn)
          </Label>
          <Input
            placeholder='Tên người liên hệ'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between'>
            <Label className='text-sm font-medium text-slate-700'>&nbsp;</Label>
            <span className='text-xs text-slate-400'>
              Người thân trong trường hợp khẩn cấp
            </span>
          </div>
          <Input
            placeholder='Số điện thoại'
            className='border-slate-200 focus-visible:ring-teal-500'
          />
        </div>
      </div>

      <div className='mt-6 flex items-center space-x-2'>
        <Checkbox id='save-contact' className='border-slate-300' />
        <label
          htmlFor='save-contact'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600'
        >
          Sử dụng thông tin liên hệ này cho các lần đặt lịch tiếp theo.
        </label>
      </div>
    </div>
  );
};
