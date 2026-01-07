export interface PatientProfile {
  id: string;
  height: number | null;
  weight: number | null;
  bloodType: string | null;
  allergies: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  healthInsuranceNumber: string | null;
  emergencyContact: string | null;
  identityNumber: string | null;
  chronicDisease: string | null;
}

export interface DashboardAppointmentDoctor {
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

export interface DashboardAppointmentTimeSlot {
  id: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface DashboardAppointmentPayment {
  id: string;
  paymentCode: string;
  method: string;
  status: string;
}

export interface DashboardAppointment {
  id: string;
  appointmentDate: string;
  status: string;
  examinationType: string;
  symptoms: string;
  notes: string;
  consultationFee: number;
  doctor: DashboardAppointmentDoctor;
  timeSlot: DashboardAppointmentTimeSlot;
  payment: DashboardAppointmentPayment;
  createdAt: string;
}

export interface ConsultationHistoryDoctor {
  id: string;
  professionalTitle: string;
  user: {
    fullName: string;
    avatar: string;
  };
  primarySpecialty: {
    id: string;
    name: string;
  };
}

export interface ConsultationHistoryTimeSlot {
  startTime: string;
  endTime: string;
}

export interface ConsultationHistory {
  id: string;
  appointmentDate: string;
  status: string;
  symptoms: string;
  diagnosis: string;
  notes: string;
  doctor: ConsultationHistoryDoctor;
  timeSlot: ConsultationHistoryTimeSlot;
  prescriptionItems: Array<{
    id: string;
    quantity: number;
    dosage: string;
    instructions: string;
    medicineBatch: {
      medicine: {
        name: string;
      };
    };
  }>;
}

export interface MedicalDocument {
  id: string;
  title: string;
  documentType: string;
  documentUrl: string;
  notes: string;
  createdAt: string;
}

export interface DashboardAppointmentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardAppointment[];
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

export interface ConsultationHistoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ConsultationHistory[];
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
