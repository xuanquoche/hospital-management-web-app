export interface ApiAppointmentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface ApiAppointmentDoctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  professionalTitle: string;
  yearsOfExperience: number;
  bio: string;
  specialty: {
    id: string;
    name: string;
  };
}

export interface ApiAppointmentTimeSlot {
  id: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface ApiAppointmentPayment {
  id: string;
  paymentCode: string;
  method: string;
  status: string;
}

export interface ApiAppointment {
  id: string;
  appointmentDate: string;
  status: string;
  examinationType: string;
  symptoms: string;
  notes: string;
  consultationFee: number;
  patient: ApiAppointmentUser;
  doctor: ApiAppointmentDoctor;
  timeSlot: ApiAppointmentTimeSlot;
  createdAt: string;
  payment: ApiAppointmentPayment;
}

export interface AppointmentListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiAppointment[];
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
}
