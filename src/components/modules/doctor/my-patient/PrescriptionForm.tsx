'use client';

import { Check, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useDebounce } from '@/hooks/use-debounce';
import { clientFetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';
import { MedicineBatch, MedicineBatchResponse } from '@/types/medicine';

interface PrescriptionItem {
  medicineBatchId: string;
  medicineName: string;
  quantity: number;
  dosage: string;
  instructions: string;
}

interface PrescriptionFormProps {
  patientId: string;
  appointmentId: string;
}

export function PrescriptionForm({
  patientId,
  appointmentId,
}: PrescriptionFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [batches, setBatches] = useState<MedicineBatch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<MedicineBatch | null>(
    null
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');

  const [prescriptionItems, setPrescriptionItems] = useState<
    PrescriptionItem[]
  >([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await clientFetcher.get<MedicineBatchResponse>(
          `/admin/medicine-batches?search=${debouncedSearch}`
        );
        if (res.data) {
          setBatches(Array.isArray(res.data) ? res.data : []);
        }
      } catch (error) {
        console.error('Failed to fetch medicine batches:', error);
      }
    };
    fetchBatches();
  }, [debouncedSearch]);

  const handleAddMedicine = () => {
    if (!selectedBatch) {
      toast.error('Vui lòng chọn thuốc');
      return;
    }
    if (quantity <= 0) {
      toast.error('Số lượng phải lớn hơn 0');
      return;
    }
    if (!dosage) {
      toast.error('Vui lòng nhập liều dùng');
      return;
    }

    const newItem: PrescriptionItem = {
      medicineBatchId: selectedBatch.id,
      medicineName: selectedBatch.medicine.name,
      quantity,
      dosage,
      instructions,
    };

    setPrescriptionItems([...prescriptionItems, newItem]);

    // Reset form
    setSelectedBatch(null);
    setSearchTerm('');
    setQuantity(1);
    setDosage('');
    setInstructions('');
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...prescriptionItems];
    newItems.splice(index, 1);
    setPrescriptionItems(newItems);
  };

  const handleSubmit = async () => {
    if (prescriptionItems.length === 0) {
      toast.error('Danh sách thuốc trống');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        items: prescriptionItems.map((item) => ({
          medicineBatchId: item.medicineBatchId,
          quantity: item.quantity,
          dosage: item.dosage,
          instructions: item.instructions,
        })),
      };

      await clientFetcher.patch(
        `/doctors/me/appointments/${appointmentId}/prescription`,
        {
          ...payload,
        }
      );

      toast.success('Lưu đơn thuốc thành công');
      router.push(`/doctor/my-patient/detail/${patientId}`);
    } catch (error) {
      console.error('Failed to save prescription:', error);
      toast.error('Lưu đơn thuốc thất bại ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-slate-900'>
          Kê đơn thuốc (Prescription)
        </h1>
        <Button variant='outline' onClick={() => router.back()}>
          Quay lại
        </Button>
      </div>

      <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6'>
        <h2 className='text-lg font-semibold text-slate-900'>
          Thêm thuốc vào đơn
        </h2>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label>Tìm thuốc (Tên, Mã, Hoạt chất)</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-full justify-between'
                >
                  {selectedBatch
                    ? `${selectedBatch.medicine.name} (${selectedBatch.batchNumber})`
                    : 'Nhập tên thuốc để tìm kiếm...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[600px] p-0' align='start'>
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder='Tìm thuốc...'
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                  />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy thuốc.</CommandEmpty>
                    <CommandGroup>
                      {batches.map((batch) => (
                        <CommandItem
                          key={batch.id}
                          value={batch.id}
                          onSelect={() => {
                            setSelectedBatch(batch);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedBatch?.id === batch.id
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          <div className='flex flex-col'>
                            <span className='font-medium'>
                              {batch.medicine.name}
                            </span>
                            <span className='text-xs text-muted-foreground'>
                              Mã: {batch.medicine.code} | Hoạt chất:{' '}
                              {batch.medicine.activeIngredient} | Tồn:{' '}
                              {batch.currentStock}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label>Số lượng (Quantity)</Label>
              <Input
                type='number'
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className='space-y-2'>
              <Label>Liều dùng (Dosage)</Label>
              <Input
                placeholder='VD: 2 viên/ngày, sau ăn'
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label>Hướng dẫn chi tiết (Instructions)</Label>
            <Textarea
              placeholder='Ghi chú thêm (nếu có)...'
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div className='flex justify-end'>
            <Button
              variant='outline'
              className='text-teal-600 border-teal-600 hover:bg-teal-50'
              onClick={handleAddMedicine}
            >
              <Plus className='mr-2 h-4 w-4' />
              Thêm vào danh sách
            </Button>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6'>
        <h2 className='text-lg font-semibold text-slate-900'>
          Danh sách thuốc đã kê
        </h2>

        <div className='rounded-md border'>
          <Table>
            <TableHeader className='bg-teal-50/50'>
              <TableRow>
                <TableHead className='w-[50px]'>#</TableHead>
                <TableHead>Tên thuốc</TableHead>
                <TableHead>SL</TableHead>
                <TableHead>Liều dùng</TableHead>
                <TableHead>Hướng dẫn</TableHead>
                <TableHead className='w-[50px]'>Xóa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prescriptionItems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='text-center py-8 text-muted-foreground'
                  >
                    Chưa có thuốc nào trong đơn
                  </TableCell>
                </TableRow>
              ) : (
                prescriptionItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className='font-medium'>
                      {item.medicineName}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.dosage}</TableCell>
                    <TableCell>{item.instructions || '-'}</TableCell>
                    <TableCell>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='text-red-500 hover:text-red-600 hover:bg-red-50'
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className='flex justify-end gap-4'>
          <Button variant='outline' onClick={() => router.back()}>
            Hủy bỏ
          </Button>
          <Button
            className='bg-teal-600 hover:bg-teal-700 text-white'
            onClick={handleSubmit}
            disabled={loading || prescriptionItems.length === 0}
          >
            {loading ? 'Đang lưu...' : 'Lưu đơn thuốc'}
          </Button>
        </div>
      </div>
    </div>
  );
}
