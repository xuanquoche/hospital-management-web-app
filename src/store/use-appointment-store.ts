import { create } from 'zustand';

import { Doctor } from '@/types/doctor';

export interface PatientInfo {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  reason: string;
  insuranceNumber?: string;
}

interface AppointmentState {
  currentStep: number;
  selectedDoctor: Doctor | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  patientInfo: PatientInfo | null;
  paymentMethod: 'credit_card' | 'ewallet' | 'cash' | null;
  note: string;

  setCurrentStep: (step: number) => void;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setPatientInfo: (info: PatientInfo | null) => void;
  setPaymentMethod: (method: 'credit_card' | 'ewallet' | 'cash' | null) => void;
  setNote: (note: string) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  currentStep: 1,
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  patientInfo: {
    fullName: 'Nguyễn Minh Anh',
    dateOfBirth: '1995-03-12',
    gender: 'Nữ',
    phone: '0912 345 678',
    email: 'minh.anh@example.com',
    address: 'Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    reason: 'Đau đầu, chóng mặt',
    insuranceNumber: 'BHYT - Bảo hiểm y tế nhà nước',
  },
  paymentMethod: null,
  note: '',

  setCurrentStep: (step) => set({ currentStep: step }),
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setPatientInfo: (info) => set({ patientInfo: info }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setNote: (note) => set({ note }),
}));
