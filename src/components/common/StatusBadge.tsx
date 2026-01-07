import React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusType =
  | 'CANCELLED'
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'FAILED'
  | 'SUCCESS';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
  variant?: 'default' | 'outline';
}

const statusConfig: Record<string, { label: string; className: string }> = {
  CANCELLED: {
    label: 'Đã hủy',
    className:
      'bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20',
  },
  FAILED: {
    label: 'Thất bại',
    className:
      'bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20',
  },
  PENDING: {
    label: 'Chờ xác nhận',
    className:
      'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200',
  },
  CONFIRMED: {
    label: 'Đã xác nhận',
    className:
      'bg-green-100 text-green-700 hover:bg-green-200 border-green-200',
  },
  SUCCESS: {
    label: 'Thành công',
    className:
      'bg-green-100 text-green-700 hover:bg-green-200 border-green-200',
  },
  COMPLETED: {
    label: 'Hoàn thành',
    className: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  variant = 'default',
}) => {
  const normalizedStatus = status.toUpperCase();
  const config = statusConfig[normalizedStatus] || {
    label: status,
    className: 'bg-gray-100 text-gray-700',
  };

  return (
    <Badge
      variant={variant === 'outline' ? 'outline' : 'secondary'}
      className={cn(
        'px-2.5 py-0.5 text-xs font-semibold shadow-sm',
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
};
