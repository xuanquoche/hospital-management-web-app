export enum PaymentMethod {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
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
