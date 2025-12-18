export interface UserProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
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
    };
    profile: {
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
    };
  };
  timestamp: string;
}
