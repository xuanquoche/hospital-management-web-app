'use client';

import { format } from 'date-fns';
import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  XCircle,
} from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getPolygonscanUrl } from '@/lib/blockchain';
import { clientFetcher } from '@/lib/fetcher';

interface BlockchainVerifyButtonProps {
  documentId: string;
  txHash?: string | null;
  variant?: 'icon' | 'button';
  size?: 'sm' | 'default';
}

interface VerifyResult {
  isValid: boolean;
  isRevoked: boolean;
  recordType: number;
  timestamp: number;
  message: string;
}

interface BlockchainInfo {
  dataHash: string | null;
  txHash: string | null;
  blockNumber: number | null;
  status: string | null;
  isRecorded: boolean;
  recordedAt: string | null;
}

interface ApiVerifyResponse {
  verification: VerifyResult;
  blockchain: BlockchainInfo;
}

export const BlockchainVerifyButton = ({
  documentId,
  txHash,
  variant = 'icon',
  size = 'sm',
}: BlockchainVerifyButtonProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifyData, setVerifyData] = useState<ApiVerifyResponse | null>(null);

  const handleVerify = async () => {
    setOpen(true);
    setIsLoading(true);
    setError(null);
    setVerifyData(null);

    try {
      const response = await clientFetcher.get(
        `/upload/document/${documentId}/blockchain`
      );
      setVerifyData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xác minh thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setVerifyData(null);
  };

  const renderStatus = () => {
    if (isLoading) {
      return (
        <div className='flex flex-col items-center justify-center py-8'>
          <Loader2 className='w-12 h-12 animate-spin text-teal-600 mb-4' />
          <p className='text-slate-600'>Đang xác minh trên blockchain...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className='flex flex-col items-center justify-center py-8'>
          <XCircle className='w-16 h-16 text-red-500 mb-4' />
          <h4 className='text-lg font-semibold text-slate-900 mb-2'>
            Lỗi xác minh
          </h4>
          <p className='text-sm text-red-500 text-center'>{error}</p>
        </div>
      );
    }

    if (!verifyData?.blockchain?.isRecorded) {
      return (
        <div className='flex flex-col items-center justify-center py-8'>
          <ShieldAlert className='w-16 h-16 text-amber-500 mb-4' />
          <h4 className='text-lg font-semibold text-slate-900 mb-2'>
            Chưa ghi blockchain
          </h4>
          <p className='text-sm text-slate-500 text-center'>
            Tài liệu này chưa được ghi lên blockchain.
          </p>
        </div>
      );
    }

    const { verification } = verifyData;

    if (verification.isRevoked) {
      return (
        <div className='flex flex-col items-center justify-center py-8'>
          <ShieldX className='w-16 h-16 text-red-500 mb-4' />
          <h4 className='text-lg font-semibold text-red-600 mb-2'>
            Tài liệu đã bị thu hồi
          </h4>
          <p className='text-sm text-slate-500 text-center'>
            {verification.message}
          </p>
        </div>
      );
    }

    if (verification.isValid) {
      return (
        <div className='flex flex-col items-center justify-center py-8'>
          <ShieldCheck className='w-16 h-16 text-green-500 mb-4' />
          <h4 className='text-lg font-semibold text-green-600 mb-2'>
            Xác minh thành công
          </h4>
          <p className='text-sm text-slate-500 text-center mb-4'>
            {verification.message}
          </p>
          <div className='flex items-center gap-2 text-sm text-green-600'>
            <CheckCircle2 className='w-4 h-4' />
            <span>Toàn vẹn dữ liệu được đảm bảo</span>
          </div>
        </div>
      );
    }

    return (
      <div className='flex flex-col items-center justify-center py-8'>
        <ShieldX className='w-16 h-16 text-red-500 mb-4' />
        <h4 className='text-lg font-semibold text-red-600 mb-2'>
          Dữ liệu không khớp
        </h4>
        <p className='text-sm text-slate-500 text-center'>
          {verification.message}
        </p>
      </div>
    );
  };

  const displayTxHash = verifyData?.blockchain?.txHash || txHash;

  return (
    <>
      {variant === 'icon' ? (
        <Button
          variant='ghost'
          size='icon'
          className='h-7 w-7 text-slate-500 hover:text-teal-600'
          onClick={handleVerify}
          title='Xác minh blockchain'
        >
          <ShieldCheck className='w-4 h-4' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size={size}
          onClick={handleVerify}
          className='text-teal-600 border-teal-200 hover:bg-teal-50'
        >
          <ShieldCheck className='w-4 h-4 mr-1' />
          Xác minh
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className='sm:max-w-[450px]'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <ShieldCheck className='w-5 h-5 text-teal-600' />
              Xác minh Blockchain
            </DialogTitle>
            <DialogDescription>
              Xác minh tính toàn vẹn của tài liệu trên blockchain
            </DialogDescription>
          </DialogHeader>

          {renderStatus()}

          {verifyData?.blockchain?.isRecorded && (
            <div className='border-t border-slate-100 pt-4 space-y-3'>
              <h5 className='text-sm font-semibold text-slate-700'>
                Thông tin blockchain
              </h5>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-slate-500'>Trạng thái:</span>
                  <span className='font-medium text-green-600'>Đã ghi</span>
                </div>
                {verifyData.blockchain.recordedAt && (
                  <div className='flex justify-between'>
                    <span className='text-slate-500'>Thời gian ghi:</span>
                    <span className='font-medium'>
                      {format(
                        new Date(verifyData.blockchain.recordedAt),
                        'dd/MM/yyyy HH:mm'
                      )}
                    </span>
                  </div>
                )}
                {verifyData.blockchain.dataHash && (
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-500'>Data Hash:</span>
                    <code className='text-xs bg-slate-100 px-2 py-1 rounded max-w-[200px] truncate'>
                      {verifyData.blockchain.dataHash.slice(0, 20)}...
                    </code>
                  </div>
                )}
                {displayTxHash && (
                  <div className='pt-2'>
                    <a
                      href={getPolygonscanUrl(displayTxHash)}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm'
                    >
                      <ExternalLink className='w-4 h-4' />
                      Xem trên Polygonscan
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
