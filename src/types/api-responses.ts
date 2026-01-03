export interface DoctorUser {
  id: string;
  email: string;
  username: string;
  phone: string;
  fullName: string;
  avatar: string;
  address: string;
  role: string;
}

export interface PrimarySpecialty {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  doctorId: string;
  school: string;
  degree: string;
  graduationYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  doctorId: string;
  certificateName: string;
  issuingAuthority: string;
  licenseNumber: string;
  issueDate: string;
  expiryDate: string;
  documentUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Award {
  id: string;
  doctorId: string;
  title: string;
  organization: string;
  year: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatedDoctorData {
  id: string;
  userId: string;
  primarySpecialtyId: string;
  subSpecialty: string;
  professionalTitle: string;
  yearsOfExperience: number;
  consultationFee: number;
  bio: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  user: DoctorUser;
  primarySpecialty: PrimarySpecialty;
  educations: Education[];
  certifications: Certification[];
  awards: Award[];
  defaultPassword?: string;
}

export interface APIResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: CreatedDoctorData;
  timestamp: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
}
