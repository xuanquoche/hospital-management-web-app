'use client';

import { Loader2, Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { DocumentType, DocumentTypeLabels } from '@/const/enum';
import { clientFetcher } from '@/lib/fetcher';

interface UploadMedicalDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string;
  onSuccess?: () => void;
}

export const UploadMedicalDocumentModal = ({
  open,
  onOpenChange,
  appointmentId,
  onSuccess,
}: UploadMedicalDocumentModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType | ''>('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDocumentType('');
    setNotes('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error('Vui lòng chọn file tài liệu');
      return;
    }

    if (!title.trim()) {
      toast.error('Vui lòng nhập tiêu đề tài liệu');
      return;
    }

    if (!documentType) {
      toast.error('Vui lòng chọn loại tài liệu');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title.trim());
      formData.append('documentType', documentType);
      if (notes.trim()) {
        formData.append('notes', notes.trim());
      }

      await clientFetcher.postFormData(
        `/upload/medical-document/${appointmentId}`,
        formData
      );

      toast.success('Upload tài liệu thành công');
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Upload tài liệu thất bại'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Upload className='w-5 h-5 text-teal-600' />
            Upload tài liệu khám bệnh
          </DialogTitle>
          <DialogDescription>
            Tải lên tài liệu y tế cho lần khám này. Bệnh án sẽ tự động được ghi
            lên blockchain.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='file'>
              File tài liệu <span className='text-red-500'>*</span>
            </Label>
            <Input
              ref={fileInputRef}
              id='file'
              type='file'
              onChange={handleFileChange}
              accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif'
              className='cursor-pointer'
            />
            {file && (
              <p className='text-xs text-slate-500'>
                Đã chọn: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='title'>
              Tiêu đề <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Nhập tiêu đề tài liệu'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='documentType'>
              Loại tài liệu <span className='text-red-500'>*</span>
            </Label>
            <Select
              value={documentType}
              onValueChange={(value) => setDocumentType(value as DocumentType)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Chọn loại tài liệu' />
              </SelectTrigger>
              <SelectContent>
                {Object.values(DocumentType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {DocumentTypeLabels[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='notes'>Ghi chú</Label>
            <Textarea
              id='notes'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder='Nhập ghi chú (không bắt buộc)'
              rows={3}
            />
          </div>

          <DialogFooter className='gap-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
              className='bg-teal-600 hover:bg-teal-700'
            >
              {isLoading ? (
                <>
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                  Đang upload...
                </>
              ) : (
                <>
                  <Upload className='w-4 h-4 mr-2' />
                  Upload
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
