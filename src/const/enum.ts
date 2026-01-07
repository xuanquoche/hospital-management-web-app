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

export enum DocumentType {
  LAB_RESULT = 'LAB_RESULT',
  X_RAY = 'X_RAY',
  MRI = 'MRI',
  CT_SCAN = 'CT_SCAN',
  ULTRASOUND = 'ULTRASOUND',
  PRESCRIPTION = 'PRESCRIPTION',
  MEDICAL_REPORT = 'MEDICAL_REPORT',
  MEDICAL_CASE = 'MEDICAL_CASE',
  OTHER = 'OTHER',
}

export const DocumentTypeLabels: Record<DocumentType, string> = {
  [DocumentType.LAB_RESULT]: 'Kết quả xét nghiệm',
  [DocumentType.X_RAY]: 'X-Quang',
  [DocumentType.MRI]: 'MRI',
  [DocumentType.CT_SCAN]: 'CT Scan',
  [DocumentType.ULTRASOUND]: 'Siêu âm',
  [DocumentType.PRESCRIPTION]: 'Đơn thuốc',
  [DocumentType.MEDICAL_REPORT]: 'Báo cáo y tế',
  [DocumentType.MEDICAL_CASE]: 'Bệnh án',
  [DocumentType.OTHER]: 'Khác',
};
