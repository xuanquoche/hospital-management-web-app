export interface MyPatientUser {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  avatar: string | null;
  address: string | null;
}

export interface LastAppointment {
  id: string;
  appointmentDate: string;
  status: string;
  symptoms: string | null;
  diagnosis: string | null;
}

export interface MyPatient {
  id: string;
  userId: string;
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
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: MyPatientUser;
  lastAppointment: LastAppointment | null;
}

export interface MyPatientResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MyPatient[];
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

export interface MyPatientDetail extends MyPatient {
  appointments: {
    id: string;
    appointmentDate: string;
    status: string;
    examinationType: string;
    symptoms: string | null;
    diagnosis: string | null;
    prescription: string | null;
    notes: string | null;
    completedAt: string | null;
    createdAt: string;
    timeSlot: {
      startTime: string;
      endTime: string;
    };
    documents: any[];
  }[];
}

export interface MyPatientDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MyPatientDetail;
  timestamp: string;
}
