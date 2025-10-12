'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  AddressInfo,
  AppointmentInfo,
  AppointmentSchedule,
  AwardsCertifications,
  ContactInfo,
  EducationInfo,
} from '@/components/modules/admin/doctor/sections';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const educationSchema = z.object({
  degree: z.string().nonempty('Degree is required'),
  university: z.string().nonempty('University is required'),
  from: z.string().nonempty('Start date is required'),
  to: z.string().nonempty('End date is required'),
});

const awardSchema = z.object({
  name: z.string().optional(),
  date: z.string().optional(),
});

const certificationSchema = z.object({
  name: z.string().optional(),
  date: z.string().optional(),
});

const appointmentDaySchema = z.object({
  day: z.string(),
  session: z.string(),
  from: z.string(),
  to: z.string(),
});
const formSchema = z.object({
  // 🧍 Contact Information
  name: z.string().nonempty('Name is required'),
  username: z.string().nonempty('Username is required'),
  phone: z.string().nonempty('Phone is required'),
  email: z.string().email('Invalid email'),
  dob: z.string().nonempty('Date of birth is required'),
  experience: z.coerce.number().min(0, 'Experience must be >= 0'),
  department: z.string().nonempty('Department is required'),
  designation: z.string().nonempty('Designation is required'),
  license: z.string().nonempty('Medical License is required'),
  gender: z.string().optional(),
  bloodGroup: z.string().optional(),
  bio: z.string().optional(),
  featureOnWebsite: z.boolean().default(false),

  // 🏠 Address Information
  address: z.string().optional(),

  // 🕒 Appointment Schedule
  schedule: z.array(appointmentDaySchema).optional(),

  // 💬 Appointment Information
  appointmentType: z.string().nonempty('Appointment type is required'),
  acceptBookingAdvance: z.coerce.number().optional(),
  consultationCharge: z.coerce.number().optional(),
  displayOnBooking: z.boolean().default(false),

  // 🎓 Educational Information
  educations: z.array(educationSchema).optional(),

  // 🏆 Awards & Certifications
  awards: z.array(awardSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
});

export function CreateDoctorForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      featureOnWebsite: false,
      displayOnBooking: false,
      educations: [{ degree: '', university: '', from: '', to: '' }],
      awards: [],
      certifications: [],
      schedule: [],
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='flex flex-col gap-6 max-w-4xl mx-auto'
    >
      <Card className='p-6 space-y-6'>
        <ContactInfo form={form} />
        <Separator />
        <AddressInfo form={form} />
        <Separator />
        <AppointmentSchedule form={form} />
        <Separator />
        <AppointmentInfo form={form} />
        <Separator />
        <EducationInfo control={form.control} />
        <Separator />
        <AwardsCertifications form={form} />
      </Card>

      <div className='flex justify-end gap-2'>
        <Button type='button' variant='outline'>
          Cancel
        </Button>
        <Button type='submit' className='bg-primary text-white'>
          Add Doctor
        </Button>
      </div>
    </form>
  );
}
