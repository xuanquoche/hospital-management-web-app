import { create } from 'zustand';

type Step = 'date' | 'time' | 'info' | 'complete';

interface AppointmentState {
  step: Step;
  date: Date | null;
  time: string | null;
  setStep: (step: Step) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  step: 'date',
  date: null,
  time: null,
  setStep: (step) => set({ step }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
}));
