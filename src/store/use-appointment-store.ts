import { create } from 'zustand';

import { AIDoctorInfo, AIResponseSuggestion } from '@/types/ai-booking';
import { Doctor } from '@/types/doctor';
import { PaymentMethod } from '@/types/payment';

export interface PatientInfo {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  insuranceNumber?: string;
}

interface AppointmentState {
  currentStep: number;
  selectedDoctor: Doctor | AIDoctorInfo | null;
  selectedDate: Date | null;
  selectedTime: string | null; // Display time string
  timeSlotId: string | null; // API field
  examinationType: 'IN_PERSON' | 'ONLINE' | 'HOME' | null;
  symptoms: string;
  notes: string;
  patientInfo: PatientInfo | null;
  paymentMethod: PaymentMethod | null;
  aiAnalysis: AIResponseSuggestion | null;

  setCurrentStep: (step: number) => void;
  setSelectedDoctor: (doctor: Doctor | AIDoctorInfo | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setTimeSlotId: (id: string | null) => void;
  setExaminationType: (type: 'IN_PERSON' | 'ONLINE' | 'HOME' | null) => void;
  setSymptoms: (symptoms: string) => void;
  setNotes: (notes: string) => void;
  setPatientInfo: (info: PatientInfo | null) => void;
  setPaymentMethod: (method: PaymentMethod | null) => void;
  setAiAnalysis: (analysis: AIResponseSuggestion | null) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  currentStep: 1,
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  timeSlotId: null,
  examinationType: 'IN_PERSON',
  symptoms: '',
  notes: '',
  patientInfo: null,
  paymentMethod: null,
  aiAnalysis: null,

  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setTimeSlotId: (id) => set({ timeSlotId: id }),
  setExaminationType: (type) => set({ examinationType: type }),
  setSymptoms: (symptoms) => set({ symptoms }),
  setNotes: (notes) => set({ notes }),
  setPatientInfo: (info) => set({ patientInfo: info }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setAiAnalysis: (analysis) => set({ aiAnalysis: analysis }),
}));
