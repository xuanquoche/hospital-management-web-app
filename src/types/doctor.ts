export interface TimeSlot {
  id: string;
  dayOfWeek:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';
  startTime: string;
  endTime: string;
  examinationType: 'IN_PERSON' | 'ONLINE';
  maxPatients: number;
  availableDates: string[];
}

export interface Schedule {
  id: string;
  startDate: string;
  endDate: string;
  timezone: string;
  isActive: boolean;
  timeSlots: TimeSlot[];
}

export interface Doctor {
  image?: string;
  id: string | number;
  userId: string;
  primarySpecialtyId: string;
  subSpecialty: string;
  professionalTitle: string;
  yearsOfExperience: number;
  consultationFee: number;
  bio: string;
  status: 'ACTIVE' | 'INACTIVE';
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    username: string;
    phone: string;
    fullName: string;
    avatar: string;
    address: string;
    role: string;
    createdAt: string;
  };
  primarySpecialty: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    department: {
      id: string;
      name: string;
    };
  };
  educations: Array<{
    id: string;
    doctorId: string;
    school: string;
    degree: string;
    graduationYear: number;
    createdAt: string;
    updatedAt: string;
  }>;
  certifications: Array<{
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
  }>;
  awards: Array<{
    id: string;
    doctorId: string;
    title: string;
    organization: string;
    year: number;
    description: string;
    createdAt: string;
    updatedAt: string;
  }>;
  headOfDepartment: null;
  schedules: Schedule[];
  timestamp?: string;
}

export interface DoctorListItem {
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
  deletedAt: string | null;
  user: {
    id: string;
    email: string;
    username: string;
    phone: string;
    fullName: string;
    avatar: string;
    address: string;
    role: string;
  };
  primarySpecialty: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
  };
}
