'use client';

import {
  CheckCircle2,
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
import { Label } from '@/components/ui/label';
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
  calculatedDataHash?: string;
  originalDataHash?: string;
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

  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setVerifyResult(null);
    setError(null);
  };

  const renderResult = () => {
    if (error) {
      return (
        <div className='flex flex-col items-center justify-center py-6'>
          <ShieldAlert className='w-14 h-14 text-amber-500 mb-3' />
          <h4 className='text-base font-semibold text-slate-900 mb-1'>
            Không thể xác minh
          </h4>
          <p className='text-sm text-slate-500 text-center'>{error}</p>
        </div>
      );
    }

    if (!verifyResult) return null;

    if (verifyResult.isRevoked) {
      return (
        <div className='flex flex-col items-center justify-center py-6'>
          <ShieldX className='w-14 h-14 text-red-500 mb-3' />
          <h4 className='text-base font-semibold text-red-600 mb-1'>
            Tài liệu đã bị thu hồi
          </h4>
          <p className='text-sm text-slate-500 text-center mb-3'>
            {verifyResult.message}
          </p>
        </div>
      );
    }

    if (verifyResult.isValid) {
      return (
        <div className='flex flex-col items-center justify-center py-6'>
          <ShieldCheck className='w-14 h-14 text-green-500 mb-3' />
          <h4 className='text-base font-semibold text-green-600 mb-1'>
            File hợp lệ ✓
          </h4>
          <p className='text-sm text-slate-500 text-center mb-3'>
            {verifyResult.message}
          </p>
          <div className='flex items-center gap-2 text-sm text-green-600'>
            <CheckCircle2 className='w-4 h-4' />
            <span>Xác minh qua blockchain thành công</span>
          </div>
        </div>
      );
    }

    return (
      <div className='flex flex-col items-center justify-center py-6'>
        <ShieldX className='w-14 h-14 text-red-500 mb-3' />
        <h4 className='text-base font-semibold text-red-600 mb-1'>
          File không hợp lệ ✗
        </h4>
        <p className='text-sm text-slate-500 text-center mb-3'>
          {verifyResult.message}
        </p>
        <div className='flex items-center gap-2 text-sm text-red-600'>
          <XCircle className='w-4 h-4' />
          <span>Cảnh báo: File có thể bị giả mạo</span>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='h-7 w-7 text-slate-500 hover:text-blue-600'
          onClick={() => setOpen(true)}
          title='Xác minh file tải về (Trustless)'
        >
          <FileUp className='w-4 h-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <ShieldCheck className='w-5 h-5 text-teal-600' />
            Xác minh file đã tải về
          </DialogTitle>
          <DialogDescription>
            Upload file để xác minh trực tiếp với blockchain (Trustless)
            {documentTitle && (
              <span className='block mt-1 font-medium text-slate-700'>
                Tài liệu: {documentTitle}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {!verifyResult && !error && (
          <div className='space-y-4'>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className='border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer'
              onClick={() =>
                document.getElementById('file-verify-input')?.click()
              }
            >
              <Upload className='w-10 h-10 text-slate-400 mx-auto mb-3' />
              <p className='text-sm text-slate-600 mb-1'>
                Kéo thả file vào đây hoặc click để chọn
              </p>
              <p className='text-xs text-slate-400'>
                Hỗ trợ: PDF, DOC, DOCX, JPG, PNG
              </p>
              <Input
                id='file-verify-input'
                type='file'
                onChange={handleFileChange}
                className='hidden'
                accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif'
              />
            </div>

            {file && (
              <div className='bg-slate-50 rounded-lg p-3'>
                <div className='flex items-center gap-2'>
                  <FileUp className='w-5 h-5 text-teal-600' />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-slate-900 truncate'>
                      {file.name}
                    </p>
                    <p className='text-xs text-slate-500'>
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className='flex gap-2 pt-2'>
              <Button
                variant='outline'
                onClick={handleClose}
                className='flex-1'
              >
                Hủy
              </Button>
              <Button
                onClick={handleVerify}
                disabled={!file || isVerifying}
                className='flex-1 bg-teal-600 hover:bg-teal-700'
              >
                {isVerifying ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Đang xác minh...
                  </>
                ) : (
                  <>
                    <ShieldCheck className='w-4 h-4 mr-2' />
                    Xác minh Blockchain
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {renderResult()}

        {(verifyResult || error) && (
          <div className='border-t border-slate-100 pt-4 space-y-3'>
            <Label className='text-sm font-semibold text-slate-700'>
              Chi tiết xác minh
            </Label>
            <div className='space-y-2 text-sm bg-slate-50 rounded-lg p-3'>
              {verifyResult?.uploadedFileHash && (
                <div>
                  <p className='text-xs text-slate-500 mb-1'>
                    Hash file upload:
                  </p>
                  <code className='text-xs bg-white px-2 py-1 rounded block truncate'>
                    {verifyResult.uploadedFileHash}
                  </code>
                </div>
              )}
              {verifyResult?.calculatedDataHash && (
                <div className='border-t border-slate-200 pt-2 mt-2'>
                  <p className='text-xs text-slate-500 mb-1'>
                    Data hash tính từ file:
                  </p>
                  <code className='text-xs bg-white px-2 py-1 rounded block truncate'>
                    {verifyResult.calculatedDataHash}
                  </code>
                </div>
              )}
              {verifyResult?.originalDataHash && !verifyResult.isValid && (
                <div>
                  <p className='text-xs text-slate-500 mb-1'>
                    Data hash gốc (blockchain):
                  </p>
                  <code className='text-xs bg-white px-2 py-1 rounded block truncate'>
                    {verifyResult.originalDataHash}
                  </code>
                </div>
              )}
            </div>
            {txHash && (
              <a
                href={getPolygonscanUrl(txHash)}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm'
              >
                <ExternalLink className='w-4 h-4' />
                Xem trên Polygonscan
              </a>
            )}

            <Button
              variant='outline'
              onClick={handleClose}
              className='w-full mt-2'
            >
              Đóng
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
