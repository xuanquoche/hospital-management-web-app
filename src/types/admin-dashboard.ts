export interface AdminAppointment {
  id: string;
  appointmentDate: string;
  status: string;
  examinationType: string;
  symptoms: string;
  notes: string;
  consultationFee: number;
  patient: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  doctor: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    professionalTitle: string;
    specialty: {
      id: string;
      name: string;
    };
  };
  timeSlot: {
    id: string;
    date: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  };
  payment: {
    id: string;
    paymentCode: string;
    method: string;
    status: string;
  };
  createdAt: string;
}

export interface AdminDoctor {
  id: string;
  professionalTitle: string;
  licenseNumber: string;
  yearsOfExperience: number;
  consultationFee: number;
  status: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
  };
  primarySpecialty: {
    id: string;
    name: string;
  };
}

export interface AdminPatient {
  id: string;
  bloodType: string;
  gender: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    createdAt: string;
  };
}

export type PaymentType = 'CONSULTATION' | 'MEDICINE';

export interface AdminPayment {
  id: string;
  paymentCode: string;
  type: PaymentType;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
  appointment?: {
    id: string;
    appointmentDate: string;
    consultationFee: number;
  };
}

export interface WeeklyDataItem {
  day: string;
  date: string;
  appointments: number;
  revenue: number;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  totalRevenue: number;
  todayAppointments: number;
  weeklyData: WeeklyDataItem[];
  weeklyTotalAppointments: number;
  weeklyTotalRevenue: number;
}

export interface AdminAppointmentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminAppointment[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
}

export interface AdminDoctorsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminDoctor[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
}

export interface AdminPatientsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminPatient[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
}

export interface AdminPaymentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminPayment[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
}
