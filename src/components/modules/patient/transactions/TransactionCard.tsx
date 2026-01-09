'use client';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ChevronDown, ChevronUp, Copy, ExternalLink, Hash } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PaymentMethod, PaymentStatus, TransactionItem } from '@/types/payment';

import { StatusBadge } from './StatusBadge';

interface TransactionCardProps {
  transaction: TransactionItem;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    paymentCode,
    type,
    amount,
    status,
    method,
    createdAt,
    appointment,
    dataHash,
    blockchainTxHash,
    transactions = [],
  } = transaction;

  const { doctor } = appointment;

  const getPaymentTypeLabel = (paymentType: string) => {
    switch (paymentType) {
      case 'CONSULTATION':
        return 'Phí khám';
      case 'MEDICINE':
        return 'Tiền thuốc';
      default:
        return paymentType;
    }
  };

  const handleCopyHash = (hash: string, label: string) => {
    navigator.clipboard.writeText(hash);
    toast.success(`Đã sao chép ${label}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case PaymentMethod.BANK_TRANSFER:
        return 'Chuyển khoản ngân hàng';
      case PaymentMethod.CASH:
        return 'Tiền mặt';
      case PaymentMethod.WALLET:
        return 'Ví điện tử';
      default:
        return method;
    }
  };

  return (
    <Card className='overflow-hidden border-slate-100 transition-all hover:border-teal-100 hover:shadow-md'>
      <div className='p-5'>
        {/* Header Row */}
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-4'>
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                status === PaymentStatus.SUCCESS
                  ? 'bg-teal-50 text-teal-600'
                  : status === PaymentStatus.PENDING
                    ? 'bg-yellow-50 text-yellow-600'
                    : 'bg-red-50 text-red-600'
              }`}
            >
              {status === PaymentStatus.SUCCESS ? (
                <span className='font-bold'>$</span>
              ) : (
                <Hash className='h-5 w-5' />
              )}
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <span className='font-bold text-slate-900'>{paymentCode}</span>
                <StatusBadge status={status} className='text-[10px] h-5' />
                <Badge
                  variant='outline'
                  className={`text-[10px] h-5 px-1.5 ${
                    type === 'MEDICINE'
                      ? 'border-amber-200 text-amber-600 bg-amber-50'
                      : 'border-blue-200 text-blue-600 bg-blue-50'
                  }`}
                >
                  {getPaymentTypeLabel(type)}
                </Badge>
              </div>
              <p className='text-xs text-slate-500'>
                {format(new Date(createdAt), 'dd MMMM, yyyy - HH:mm', {
                  locale: vi,
                })}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between gap-6 sm:justify-end'>
            <div className='text-right'>
              <p className='text-lg font-bold text-slate-900'>
                {formatCurrency(amount)}
              </p>
              <div className='flex items-center gap-2 text-xs text-slate-500'>
                <span>{getPaymentMethodLabel(method)}</span>
                {transactions.length > 0 && (
                  <Badge
                    variant='outline'
                    className='text-[10px] h-4 px-1 border-teal-200 text-teal-600'
                  >
                    {transactions.length} giao dịch
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsExpanded(!isExpanded)}
              className='h-8 w-8 text-slate-400 hover:bg-slate-100 hover:text-teal-600'
            >
              {isExpanded ? (
                <ChevronUp className='h-5 w-5' />
              ) : (
                <ChevronDown className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className='animate-in fade-in slide-in-from-top-1 duration-200 mt-5 pt-5 border-t border-slate-100'>
            {/* Transactions Breakdown */}
            {transactions.length > 0 && (
              <div className='mb-6 space-y-3'>
                <h4 className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
                  Chi tiết giao dịch ngân hàng
                </h4>
                <div className='space-y-2'>
                  {transactions.map((tx, index) => (
                    <div
                      key={tx.id}
                      className='flex items-center justify-between rounded-lg bg-slate-50 p-3'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700 text-xs font-bold'>
                          {index + 1}
                        </div>
                        <div>
                          <p className='text-sm font-medium text-slate-900'>
                            {tx.transactionContent || 'Chuyển khoản'}
                          </p>
                          <p className='text-xs text-slate-500'>
                            {format(
                              new Date(tx.transactionDate),
                              'dd/MM/yyyy HH:mm',
                              { locale: vi }
                            )}
                          </p>
                        </div>
                      </div>
                      <p className='font-bold text-teal-600'>
                        +{formatCurrency(tx.amountIn)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Payment Summary */}
                <div className='rounded-lg border border-slate-200 p-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-slate-500'>
                      {getPaymentTypeLabel(type)}:
                    </span>
                    <span className='text-lg font-bold text-teal-600'>
                      {formatCurrency(amount)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className='grid gap-6 md:grid-cols-2'>
              {/* Doctor & Appointment Info */}
              <div className='space-y-4'>
                <h4 className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
                  Thông tin lịch hẹn
                </h4>
                <div className='flex items-start gap-4'>
                  <Avatar className='h-12 w-12 border border-slate-100'>
                    <AvatarImage src={doctor.user.avatar || undefined} />
                    <AvatarFallback className='bg-teal-50 text-teal-700 font-bold'>
                      {doctor.user.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-semibold text-slate-900'>
                      {doctor.professionalTitle} {doctor.user.fullName}
                    </p>
                    <p className='text-sm text-slate-600'>
                      {doctor.primarySpecialty.name}
                    </p>
                    <div className='mt-2 flex items-center gap-2 text-xs text-slate-500'>
                      <span className='rounded-full bg-slate-100 px-2 py-1'>
                        {format(
                          new Date(appointment.appointmentDate),
                          'dd/MM/yyyy',
                          { locale: vi }
                        )}
                      </span>
                      <span className='rounded-full bg-slate-100 px-2 py-1'>
                        {appointment.examinationType === 'IN_PERSON'
                          ? 'Khám tại viện'
                          : 'Khám online'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blockchain Info (Only if Success) */}
              {status === PaymentStatus.SUCCESS &&
                (dataHash || blockchainTxHash) && (
                  <div className='space-y-4'>
                    <h4 className='text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2'>
                      Xác thực Blockchain
                      <Badge
                        variant='secondary'
                        className='bg-blue-50 text-blue-600 hover:bg-blue-100 text-[10px] border-blue-100'
                      >
                        Verified
                      </Badge>
                    </h4>

                    <div className='space-y-3'>
                      {dataHash && (
                        <div className='group rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100'>
                          <div className='mb-1 flex items-center justify-between'>
                            <span className='text-xs font-medium text-slate-500'>
                              Integrity Hash
                            </span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() =>
                                      handleCopyHash(dataHash, 'Data Hash')
                                    }
                                    className='opacity-0 transition-opacity group-hover:opacity-100'
                                  >
                                    <Copy className='h-3 w-3 text-slate-400 hover:text-teal-600' />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>Copy Hash</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <p className='truncate font-mono text-xs text-slate-700'>
                            {dataHash}
                          </p>
                        </div>
                      )}

                      {blockchainTxHash && (
                        <div className='group rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100'>
                          <div className='mb-1 flex items-center justify-between'>
                            <span className='text-xs font-medium text-slate-500'>
                              Transaction Hash
                            </span>
                            <div className='flex gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      onClick={() =>
                                        handleCopyHash(
                                          blockchainTxHash,
                                          'Tx Hash'
                                        )
                                      }
                                    >
                                      <Copy className='h-3 w-3 text-slate-400 hover:text-teal-600' />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>Copy Tx Hash</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={`https://scan.testnet.chain/tx/${blockchainTxHash}`} // Placeholder URL
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      <ExternalLink className='h-3 w-3 text-slate-400 hover:text-teal-600' />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    View on Explorer
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <p className='truncate font-mono text-xs text-slate-700'>
                            {blockchainTxHash}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
