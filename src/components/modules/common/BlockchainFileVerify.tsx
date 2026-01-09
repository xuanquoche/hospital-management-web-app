'use client';

import {
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileUp,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Upload,
  XCircle,
} from 'lucide-react';
import React, { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getPolygonscanUrl } from '@/lib/blockchain';
import { clientFetcher } from '@/lib/fetcher';

interface BlockchainFileVerifyProps {
  documentId: string;
  txHash?: string | null;
  documentTitle?: string;
}

interface VerifyResult {
  isValid: boolean;
  isRevoked: boolean;
  recordType: number;
  timestamp: number;
  message: string;
  uploadedFileHash?: string;
  originalFileHash?: string | null;
  fileHashMatch?: boolean;
  calculatedDataHash?: string;
  originalDataHash?: string;
  currentMetadata?: {
    title: string;
    documentType: string;
    documentUrl: string;
    createdAt: string;
  };
}

export const BlockchainFileVerify = ({
  documentId,
  txHash,
  documentTitle,
}: BlockchainFileVerifyProps) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setVerifyResult(null);
      setError(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setVerifyResult(null);
      setError(null);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleVerify = async () => {
    if (!file) return;

    setIsVerifying(true);
    setError(null);
    setVerifyResult(null);
    setShowDetails(false);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await clientFetcher.postFormData(
        `/upload/document/${documentId}/blockchain/verify-file`,
        formData
      );

      setVerifyResult(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Đã xảy ra lỗi khi xác minh'
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setFile(null);
      setVerifyResult(null);
      setError(null);
      setShowDetails(false);
    }
  };

  const getStatus = () => {
    if (!verifyResult) return null;

    if (verifyResult.isRevoked) {
      return {
        icon: ShieldX,
        color: 'red',
        bg: 'bg-red-50 border-red-200',
        iconColor: 'text-red-500',
        titleColor: 'text-red-600',
        title: 'Tài liệu đã bị thu hồi',
        desc: 'Tài liệu này đã bị vô hiệu hóa',
      };
    }

    if (verifyResult.isValid) {
      return {
        icon: ShieldCheck,
        color: 'green',
        bg: 'bg-green-50 border-green-200',
        iconColor: 'text-green-500',
        titleColor: 'text-green-600',
        title: 'Xác minh thành công ✓',
        desc: 'File và metadata khớp với blockchain',
      };
    }

    if (verifyResult.fileHashMatch) {
      return {
        icon: ShieldAlert,
        color: 'amber',
        bg: 'bg-amber-50 border-amber-200',
        iconColor: 'text-amber-500',
        titleColor: 'text-amber-600',
        title: 'File OK - Metadata đã thay đổi',
        desc: 'Nội dung file OK, nhưng thông tin DB bị sửa',
      };
    }

    return {
      icon: ShieldX,
      color: 'red',
      bg: 'bg-red-50 border-red-200',
      iconColor: 'text-red-500',
      titleColor: 'text-red-600',
      title: 'File không hợp lệ ✗',
      desc: 'Nội dung file không khớp - có thể bị giả mạo',
    };
  };

  const renderResult = () => {
    if (error) {
      return (
        <div className='flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg'>
          <ShieldAlert className='w-8 h-8 text-amber-500 flex-shrink-0' />
          <div>
            <p className='font-medium text-amber-700'>Không thể xác minh</p>
            <p className='text-xs text-amber-600'>{error}</p>
          </div>
        </div>
      );
    }

    if (!verifyResult) return null;

    const status = getStatus();
    if (!status) return null;

    const StatusIcon = status.icon;

    return (
      <div className='space-y-3'>
        <div
          className={`flex items-center gap-3 p-3 border rounded-lg ${status.bg}`}
        >
          <StatusIcon className={`w-8 h-8 ${status.iconColor} flex-shrink-0`} />
          <div className='flex-1 min-w-0'>
            <p className={`font-semibold ${status.titleColor}`}>
              {status.title}
            </p>
            <p className='text-xs text-slate-600'>{status.desc}</p>
          </div>
        </div>

        <div className='flex items-center gap-2 text-xs'>
          <span
            className={
              verifyResult.fileHashMatch ? 'text-green-600' : 'text-red-600'
            }
          >
            {verifyResult.fileHashMatch ? (
              <CheckCircle2 className='w-3.5 h-3.5 inline mr-1' />
            ) : (
              <XCircle className='w-3.5 h-3.5 inline mr-1' />
            )}
            File {verifyResult.fileHashMatch ? 'khớp' : 'không khớp'}
          </span>
          <span className='text-slate-300'>|</span>
          <span
            className={verifyResult.isValid ? 'text-green-600' : 'text-red-600'}
          >
            {verifyResult.isValid ? (
              <CheckCircle2 className='w-3.5 h-3.5 inline mr-1' />
            ) : (
              <XCircle className='w-3.5 h-3.5 inline mr-1' />
            )}
            Blockchain {verifyResult.isValid ? 'khớp' : 'không khớp'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='h-7 w-7 text-slate-500 hover:text-blue-600'
          title='Xác minh file tải về (Trustless)'
        >
          <FileUp className='w-4 h-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[440px]'>
        <DialogHeader className='pb-2'>
          <DialogTitle className='flex items-center gap-2 text-base'>
            <ShieldCheck className='w-5 h-5 text-teal-600' />
            Xác minh file
          </DialogTitle>
          {documentTitle && (
            <DialogDescription className='text-xs'>
              {documentTitle}
            </DialogDescription>
          )}
        </DialogHeader>

        {!verifyResult && !error && (
          <div className='space-y-3'>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className='border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-teal-400 transition-colors cursor-pointer'
              onClick={() =>
                document.getElementById('file-verify-input')?.click()
              }
            >
              <Upload className='w-8 h-8 text-slate-400 mx-auto mb-2' />
              <p className='text-sm text-slate-600'>
                Kéo thả hoặc click để chọn file
              </p>
              <p className='text-xs text-slate-400'>PDF, DOC, JPG, PNG</p>
              <Input
                id='file-verify-input'
                type='file'
                onChange={handleFileChange}
                className='hidden'
                accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif'
              />
            </div>

            {file && (
              <div className='flex items-center gap-2 bg-slate-50 rounded-lg p-2'>
                <FileUp className='w-4 h-4 text-teal-600' />
                <span className='text-sm truncate flex-1'>{file.name}</span>
                <span className='text-xs text-slate-400'>
                  {(file.size / 1024).toFixed(0)} KB
                </span>
              </div>
            )}

            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleOpenChange(false)}
                className='flex-1'
              >
                Hủy
              </Button>
              <Button
                size='sm'
                onClick={handleVerify}
                disabled={!file || isVerifying}
                className='flex-1 bg-teal-600 hover:bg-teal-700'
              >
                {isVerifying ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  'Xác minh'
                )}
              </Button>
            </div>
          </div>
        )}

        {renderResult()}

        {(verifyResult || error) && (
          <div className='space-y-2 pt-2 border-t border-slate-100'>
            {verifyResult && (
              <div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className='flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700'
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                  />
                  Chi tiết hash
                </button>
                {showDetails && (
                  <div className='space-y-1.5 text-[10px] pt-2'>
                    {verifyResult.uploadedFileHash && (
                      <div>
                        <span className='text-slate-500'>File hash: </span>
                        <code className='bg-slate-100 px-1 rounded break-all'>
                          {verifyResult.uploadedFileHash}
                        </code>
                      </div>
                    )}
                    {verifyResult.calculatedDataHash && (
                      <div>
                        <span className='text-slate-500'>Data hash: </span>
                        <code className='bg-slate-100 px-1 rounded break-all'>
                          {verifyResult.calculatedDataHash}
                        </code>
                      </div>
                    )}
                    {verifyResult.originalDataHash && (
                      <div>
                        <span className='text-slate-500'>Blockchain: </span>
                        <code className='bg-slate-100 px-1 rounded break-all'>
                          {verifyResult.originalDataHash}
                        </code>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className='flex items-center gap-2'>
              {txHash && (
                <a
                  href={getPolygonscanUrl(txHash)}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 text-xs'
                >
                  <ExternalLink className='w-3 h-3' />
                  Polygonscan
                </a>
              )}
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleOpenChange(false)}
                className='ml-auto'
              >
                Đóng
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
