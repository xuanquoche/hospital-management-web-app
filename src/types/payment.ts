export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
  WALLET = 'WALLET',
}

export enum PaymentStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface Payment {
  id: string;
  paymentCode: string;
  appointmentId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  appointment: {
    id: string;
    appointmentDate: string;
    consultationFee: number;
    status?: string;
    examinationType?: string;
    symptoms?: string;
    notes?: string;
    createdAt?: string;
    patient: {
      id: string;
      user: {
        fullName: string;
        phone: string;
        email?: string;
        avatar?: string;
      };
    };
    doctor: {
      id: string;
      professionalTitle?: string;
      user: {
        fullName: string;
      };
    };
  };
}

export interface PaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[];
}

export interface PaymentTransactionItem {
  id: number;
  amountIn: number;
  transactionDate: string;
  transactionContent: string | null;
}

export type PaymentType = 'CONSULTATION' | 'MEDICINE';

export interface TransactionItem {
  id: string;
  paymentCode: string;
  appointmentId: string;
  type: PaymentType;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  dataHash: string | null;
  blockchainTxHash: string | null;
  createdAt: string;
  updatedAt: string;
  transactions: PaymentTransactionItem[];
  appointment: {
    id: string;
    appointmentDate: string;
    consultationFee: number;
    medicineFee: number;
    totalFee: number;
    status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
    examinationType: 'IN_PERSON' | 'ONLINE';
    doctor: {
      id: string;
      professionalTitle: string;
      user: {
        fullName: string;
        avatar: string | null;
      };
      primarySpecialty: {
        name: string;
      };
    };
  };
}

export interface TransactionHistoryMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TransactionHistoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TransactionItem[];
  meta: TransactionHistoryMeta;
  timestamp: string;
}
