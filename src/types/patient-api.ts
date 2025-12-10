export interface ApiUser {
  id: string;
  email: string;
  username: string;
  phone: string;
  fullName: string;
  avatar: string;
  address: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ApiPatient {
  id: string;
  userId: string;
  height: number;
  weight: number;
  bloodType: string;
  allergies: string;
  dateOfBirth: string;
  gender: string;
  healthInsuranceNumber: string;
  emergencyContact: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: ApiUser;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PatientListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiPatient[];
  meta: PaginationMeta;
  timestamp: string;
}

export interface PatientDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ApiPatient;
  timestamp: string;
}
