export interface UserData {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  avatar: string;
  address: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface DoctorProfileData {
  id: string;
  professionalTitle: string;
  primarySpecialty: {
    id: string;
    name: string;
  };
  yearsOfExperience: number;
  subSpecialty: string;
  consultationFee: number;
  bio: string;
  status: string;
}

export interface ProfileData {
  id: string;
  height: number;
  weight: number;
  bloodType: string;
  allergies: string;
  dateOfBirth: string;
  gender: string;
  healthInsuranceNumber: string;
  emergencyContact: string;
  identityNumber: string;
  chronicDisease: string;
}

export interface UserProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: UserData;
    profile: ProfileData | DoctorProfileData;
  };
  timestamp: string;
}
