import { z } from 'zod';

export const profileSchema = z.object({
  // Personal Info
  fullName: z.string().min(1, 'Vui lòng nhập họ tên'),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.date(),
  idNumber: z.string().min(9, 'Số CMND/CCCD không hợp lệ'),
  address: z.string().optional(),
  insuranceType: z.string().optional(),
  insuranceNumber: z.string().optional(),

  // Health Stats
  height: z.number().min(0).optional(),
  weight: z.number().min(0).optional(),
  bloodType: z.string().optional(),
  smoking: z.boolean().optional(),
  allergies: z.string().optional(),
  chronicDiseases: z.string().optional(),

  // Contact
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  emergencyContact: z
    .string()
    .min(10, 'Số điện thoại khẩn cấp không hợp lệ')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Email không hợp lệ'),
  notificationSms: z.boolean(),
  notificationEmail: z.boolean(),
});

export enum BloodType {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = 'O+',
  O_NEG = 'O-',
}

export enum HealthInsuranceType {
  BHYT = 'bhyt',
  PRIVATE = 'private',
  NONE = 'none',
}

export type ProfileFormValues = z.infer<typeof profileSchema>;
