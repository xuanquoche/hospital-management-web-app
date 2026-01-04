export interface AIBookingRequest {
  symptoms: string;
  patientInfo: {
    age?: number;
    gender?: string;
    medicalHistory?: string[];
  };
  preferredDate?: string;
  examinationType?: 'IN_PERSON' | 'ONLINE' | 'HOME';
}

export interface AIResponseNeedsMoreInfo {
  responseType: 'NEEDS_MORE_INFO';
  followUpQuestion: string;
  suggestedQuestions: string[];
}

export interface AIAvailableSlot {
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  examinationType: 'IN_PERSON' | 'ONLINE';
  remainingSlots: number;
}

export interface AIDoctorInfo {
  id: string;
  fullName: string;
  professionalTitle: string;
  specialty: string;
  subSpecialty: string;
  yearsOfExperience: number;
  consultationFee: number;
  avatar: string | null;
  bio: string;
}

export interface AIRecommendation {
  rank: number;
  matchScore: number;
  matchReasons: string[];
  doctor: AIDoctorInfo;
  availableSlots: AIAvailableSlot[];
}

export interface AIResponseSuggestion {
  responseType: 'SUGGESTION';
  data: {
    analysis: {
      possibleConditions: string[];
      recommendedSpecialties: string[];
      urgencyLevel: string;
    };
    disclaimer: string;
    recommendations: AIRecommendation[];
  };
}

export type AIResponse = AIResponseNeedsMoreInfo | AIResponseSuggestion;
export type AIBookingResponse = AIResponse;
