import React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PaymentStatus } from '@/types/payment';

interface StatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  [PaymentStatus.SUCCESS]: {
    label: 'Thành công',
    className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
  },
  [PaymentStatus.PENDING]: {
    label: 'Đang xử lý',
    className:
      'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
  },
  [PaymentStatus.FAILED]: {
    label: 'Thất bại',
    className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
  },
  [PaymentStatus.REFUNDED]: {
    label: 'Hoàn tiền',
    className: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100',
  },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status] || {
    label: status,
    className: 'bg-slate-100 text-slate-700',
  };

  return (
    <Badge
      variant='outline'
      className={cn('font-medium border', config.className, className)}
    >
      {config.label}
    </Badge>
  );
};
