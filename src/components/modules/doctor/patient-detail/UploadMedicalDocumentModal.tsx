'use client';

import {
  CheckCircle,
  Cloud,
  Loader2,
  Shield,
  Upload,
  XCircle,
} from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
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
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DocumentType, DocumentTypeLabels } from '@/const/enum';
import {
  UploadJobStatus,
  UploadProgressData,
  useUploadSocket,
} from '@/hooks/use-upload-socket';
import { clientFetcher } from '@/lib/fetcher';
import { cn } from '@/lib/utils';

interface UploadMedicalDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string;
  onSuccess?: () => void;
}

const getProgressValue = (status: UploadJobStatus): number => {
  switch (status) {
    case UploadJobStatus.PENDING:
      return 10;
    case UploadJobStatus.UPLOADING:
      return 40;
    case UploadJobStatus.PROCESSING_BLOCKCHAIN:
      return 70;
    case UploadJobStatus.COMPLETED:
      return 100;
    case UploadJobStatus.FAILED:
      return 100;
    default:
      return 0;
  }
};

const getStatusIcon = (status: UploadJobStatus) => {
  switch (status) {
    case UploadJobStatus.PENDING:
      return <Loader2 className='w-5 h-5 animate-spin text-slate-500' />;
    case UploadJobStatus.UPLOADING:
      return <Cloud className='w-5 h-5 text-blue-500 animate-pulse' />;
    case UploadJobStatus.PROCESSING_BLOCKCHAIN:
      return <Shield className='w-5 h-5 text-purple-500 animate-pulse' />;
    case UploadJobStatus.COMPLETED:
      return <CheckCircle className='w-5 h-5 text-green-500' />;
    case UploadJobStatus.FAILED:
      return <XCircle className='w-5 h-5 text-red-500' />;
    default:
      return null;
  }
};

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
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadJobStatus | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState('');

  const handleUploadProgress = useCallback(
    (data: UploadProgressData) => {
      if (data.jobId !== currentJobId) return;

      setUploadStatus(data.status);
      setStatusMessage(data.message);
    },
    [currentJobId]
  );

  const handleUploadCompleted = useCallback(
    (data: UploadProgressData) => {
      if (data.jobId !== currentJobId) return;

      setIsLoading(false);
      toast.success(data.message || 'Upload thành công!');

      setTimeout(() => {
        resetForm();
        onOpenChange(false);
        onSuccess?.();
      }, 1500);
    },
    [currentJobId, onOpenChange, onSuccess]
  );

  const handleUploadFailed = useCallback(
    (data: UploadProgressData) => {
      if (data.jobId !== currentJobId) return;

      setIsLoading(false);
      toast.error(data.message || 'Upload thất bại!');
    },
    [currentJobId]
  );

  useUploadSocket({
    onProgress: handleUploadProgress,
    onCompleted: handleUploadCompleted,
    onFailed: handleUploadFailed,
  });

  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDocumentType('');
    setNotes('');
    setCurrentJobId(null);
    setUploadStatus(null);
    setStatusMessage('');
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
    setUploadStatus(UploadJobStatus.PENDING);
    setStatusMessage('Đang khởi tạo...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title.trim());
      formData.append('documentType', documentType);
      if (notes.trim()) {
        formData.append('notes', notes.trim());
      }

      const response = await clientFetcher.postFormData(
        `/upload/medical-document/${appointmentId}`,
        formData
      );

      const { jobId } = response.data;
      setCurrentJobId(jobId);
      setStatusMessage('Đang xử lý trong background...');
    } catch (error) {
      setIsLoading(false);
      setUploadStatus(UploadJobStatus.FAILED);
      setStatusMessage('Không thể tạo job upload');
      toast.error(
        error instanceof Error ? error.message : 'Upload tài liệu thất bại'
      );
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isLoading) {
      resetForm();
    }
    if (!isLoading) {
      onOpenChange(newOpen);
    }
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

        {uploadStatus && isLoading ? (
          <div className='py-8 space-y-6'>
            <div className='flex flex-col items-center gap-4'>
              {getStatusIcon(uploadStatus)}
              <div className='text-center'>
                <p className='font-medium text-slate-900'>{statusMessage}</p>
                <p className='text-sm text-slate-500 mt-1'>
                  {uploadStatus === UploadJobStatus.UPLOADING &&
                    'Đang tải file lên cloud...'}
                  {uploadStatus === UploadJobStatus.PROCESSING_BLOCKCHAIN &&
                    'Đang ghi dữ liệu lên blockchain...'}
                </p>
              </div>
            </div>

            <div className='space-y-2'>
              <Progress
                value={getProgressValue(uploadStatus)}
                className={cn(
                  'h-2',
                  uploadStatus === UploadJobStatus.FAILED && 'bg-red-100'
                )}
              />
              <div className='flex justify-between text-xs text-slate-500'>
                <span>Khởi tạo</span>
                <span>Upload</span>
                <span>Blockchain</span>
                <span>Hoàn thành</span>
              </div>
            </div>

            <div className='flex justify-center gap-2 text-xs'>
              <div
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-full',
                  uploadStatus === UploadJobStatus.UPLOADING
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-slate-50 text-slate-500'
                )}
              >
                <Cloud className='w-3 h-3' />
                Cloud
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-full',
                  uploadStatus === UploadJobStatus.PROCESSING_BLOCKCHAIN
                    ? 'bg-purple-50 text-purple-700'
                    : 'bg-slate-50 text-slate-500'
                )}
              >
                <Shield className='w-3 h-3' />
                Blockchain
              </div>
            </div>
          </div>
        ) : (
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
                onValueChange={(value) =>
                  setDocumentType(value as DocumentType)
                }
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
                    Đang xử lý...
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
        )}
      </DialogContent>
    </Dialog>
  );
};
