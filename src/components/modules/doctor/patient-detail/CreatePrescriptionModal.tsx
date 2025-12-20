import { zodResolver } from '@hookform/resolvers/zod';
import { Edit3 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { clientFetcher } from '@/lib/fetcher';

const formSchema = z.object({
  diagnosis: z.string().min(1, 'Vui lòng nhập chẩn đoán'),
  prescription: z.string().min(1, 'Vui lòng nhập đơn thuốc'),
  notes: z.string().optional(),
  status: z.enum(['COMPLETED']),
});

interface CreatePrescriptionModalProps {
  appointmentId?: string;
}

export const CreatePrescriptionModal = ({ appointmentId }: CreatePrescriptionModalProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diagnosis: '',
      prescription: '',
      notes: '',
      status: 'COMPLETED',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!appointmentId) {
      toast.error('Không tìm thấy thông tin cuộc hẹn');
      return;
    }

    try {
      await clientFetcher.patch(`/doctors/appointments/${appointmentId}/consultation`, values);
      toast.success('Tạo ghi chú / đơn thuốc thành công');
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error creating consultation:', error);
      toast.error('Có lỗi xảy ra khi tạo ghi chú');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex-1 md:flex-none bg-teal-600 hover:bg-teal-700 text-white'>
          <Edit3 className='w-4 h-4 mr-2' />
          Tạo ghi chú / đơn thuốc
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Tạo ghi chú / Đơn thuốc</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='diagnosis'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chẩn đoán</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập chẩn đoán...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='prescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đơn thuốc</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Nhập đơn thuốc...' className='min-h-[100px]' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Nhập ghi chú...' className='min-h-[80px]' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn trạng thái' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='COMPLETED'>Đã khám xong</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-end gap-2 pt-4'>
              <Button type='button' variant='outline' onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type='submit' className='bg-teal-600 hover:bg-teal-700'>
                Lưu thông tin
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
