export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}
export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}
export enum DepartmentStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum CancellationReason {
  PATIENT_REQUEST = 'PATIENT_REQUEST',
  DOCTOR_UNAVAILABLE = 'DOCTOR_UNAVAILABLE',
  EMERGENCY = 'EMERGENCY',
  SCHEDULE_CONFLICT = 'SCHEDULE_CONFLICT',
  OTHER = 'OTHER',
}

export const CancellationReasonLabels: Record<CancellationReason, string> = {
  [CancellationReason.PATIENT_REQUEST]: 'Bệnh nhân yêu cầu hủy',
  [CancellationReason.DOCTOR_UNAVAILABLE]: 'Bác sĩ không có mặt',
  [CancellationReason.EMERGENCY]: 'Trường hợp khẩn cấp',
  [CancellationReason.SCHEDULE_CONFLICT]: 'Xung đột lịch trình',
  [CancellationReason.OTHER]: 'Lý do khác',
};
