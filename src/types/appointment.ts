export interface AppointmentDoctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  professionalTitle: string;
  yearsOfExperience: number;
  bio: string;
  specialty: {
    id: string;
    name: string;
  };
}

export interface AppointmentPatient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AppointmentTimeSlot {
  id: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface AppointmentPayment {
  id: string;
  paymentCode: string;
  method: string;
  status: 'FAILED' | 'SUCCESS' | 'PENDING';
}

export interface Appointment {
  id: string;
  appointmentDate: string;
  status: 'CANCELLED' | 'PENDING' | 'CONFIRMED' | 'COMPLETED';
  examinationType: 'IN_PERSON' | 'ONLINE';
  symptoms: string;
  notes: string;
  consultationFee: number;
  medicineFee: number;
  totalFee: number;
  patient: AppointmentPatient;
  doctor: AppointmentDoctor;
  timeSlot: AppointmentTimeSlot;
  createdAt: string;
  payment: AppointmentPayment;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AppointmentHistoryResponse {
  success: true;
  statusCode: number;
  message: string;
  data: Appointment[];
  meta: PaginationMeta;
  timestamp: string;
}
