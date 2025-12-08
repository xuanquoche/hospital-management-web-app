'use client';

import { TransactionListHeader } from './TransactionListHeader';
import { TransactionStats } from './TransactionStats';
import { TransactionFilter } from './TransactionFilter';
import { TransactionTable, Transaction } from './TransactionTable';

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: 'TX-2025-0812-0012',
    date: '12 Aug 2025',
    time: '09:45',
    patient: {
      name: 'Nguyễn Văn A',
      phone: '0901 234 567',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Sarah Thompson',
    },
    amount: '$45.00',
    status: 'Paid',
    method: 'Cash',
  },
  {
    id: 'TX-2025-0812-0009',
    date: '12 Aug 2025',
    time: '09:10',
    patient: {
      name: 'Lê Thị B',
      phone: '0912 345 678',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Miguel Alvarez',
    },
    amount: '$60.00',
    status: 'Paid',
    method: 'Card',
  },
  {
    id: 'TX-2025-0812-0005',
    date: '12 Aug 2025',
    time: '08:30',
    patient: {
      name: 'Trần Quốc C',
      phone: '0987 654 321',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Priya Singh',
    },
    amount: '$30.00',
    status: 'Pending',
    method: 'Online',
  },
  {
    id: 'TX-2025-0811-0032',
    date: '11 Aug 2025',
    time: '16:15',
    patient: {
      name: 'Phạm Thị D',
      phone: '0973 111 222',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. James Lee',
    },
    amount: '$52.00',
    status: 'Failed',
    method: 'Card',
  },
  {
    id: 'TX-2025-0811-0010',
    date: '11 Aug 2025',
    time: '10:05',
    patient: {
      name: 'Đỗ Minh E',
      phone: '0902 888 999',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Emily Carter',
    },
    amount: '$40.00',
    status: 'Refunded',
    method: 'Online',
  },
  {
    id: 'TX-2025-0810-0003',
    date: '10 Aug 2025',
    time: '09:20',
    patient: {
      name: 'Ngô Gia F',
      phone: '0933 222 444',
      avatarUrl: 'https://github.com/shadcn.png',
    },
    doctor: {
      name: 'Dr. Aaron Chen',
    },
    amount: '$35.00',
    status: 'Paid',
    method: 'Cash',
  },
];

export function TransactionList() {
  return (
    <div className='flex flex-col gap-6'>
      <TransactionListHeader />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
        <div className='lg:col-span-3 space-y-6'>
          <TransactionFilter />
          <TransactionTable transactions={mockTransactions} />
        </div>
        <div>
          <TransactionStats />
        </div>
      </div>
    </div>
  );
}
