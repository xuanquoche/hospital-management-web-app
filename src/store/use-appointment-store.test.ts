import { PaymentMethod } from '@/types/payment';

import { useAppointmentStore } from './use-appointment-store';

describe('useAppointmentStore', () => {
  beforeEach(() => {
    useAppointmentStore.getState().reset();
  });

  it('starts with booking defaults', () => {
    const state = useAppointmentStore.getState();

    expect(state.currentStep).toBe(1);
    expect(state.examinationType).toBe('IN_PERSON');
    expect(state.paymentMethod).toBeNull();
    expect(state.selectedDoctor).toBeNull();
    expect(state.symptoms).toBe('');
  });

  it('updates appointment fields', () => {
    const selectedDate = new Date('2026-05-24T09:00:00.000Z');
    const patientInfo = {
      address: 'Ho Chi Minh City',
      dateOfBirth: '1990-01-01',
      email: 'patient@example.com',
      fullName: 'Nguyen Van A',
      gender: 'MALE',
      phone: '0900000000',
    };

    useAppointmentStore.getState().setCurrentStep(3);
    useAppointmentStore.getState().setSelectedDate(selectedDate);
    useAppointmentStore.getState().setSelectedTime('09:00');
    useAppointmentStore.getState().setTimeSlotId('slot-1');
    useAppointmentStore.getState().setExaminationType('ONLINE');
    useAppointmentStore.getState().setSymptoms('Headache');
    useAppointmentStore.getState().setNotes('Needs interpreter');
    useAppointmentStore.getState().setPatientInfo(patientInfo);
    useAppointmentStore.getState().setPaymentMethod(PaymentMethod.CASH);

    expect(useAppointmentStore.getState()).toMatchObject({
      currentStep: 3,
      examinationType: 'ONLINE',
      notes: 'Needs interpreter',
      patientInfo,
      paymentMethod: PaymentMethod.CASH,
      selectedDate,
      selectedTime: '09:00',
      symptoms: 'Headache',
      timeSlotId: 'slot-1',
    });
  });

  it('resets changed booking fields', () => {
    useAppointmentStore.getState().setCurrentStep(2);
    useAppointmentStore.getState().setSymptoms('Cough');

    useAppointmentStore.getState().reset();

    expect(useAppointmentStore.getState()).toMatchObject({
      currentStep: 1,
      examinationType: 'IN_PERSON',
      paymentMethod: null,
      selectedDoctor: null,
      symptoms: '',
    });
  });
});
