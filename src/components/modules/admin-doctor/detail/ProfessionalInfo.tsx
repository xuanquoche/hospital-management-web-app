import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Doctor } from '@/types/doctor';

interface ProfessionalInfoProps {
  doctor: Doctor;
}

export function ProfessionalInfo({ doctor }: ProfessionalInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional information</CardTitle>
        <CardDescription>
          Key contact and specialization details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-1'>
            <p className='text-muted-foreground text-sm'>Specialty</p>
            <p className='font-medium'>{doctor.primarySpecialty.name}</p>
          </div>
          <div className='space-y-1'>
            <p className='text-muted-foreground text-sm'>Years of experience</p>
            <p className='font-medium'>{doctor.yearsOfExperience} years</p>
          </div>
          <div className='space-y-1'>
            <p className='text-muted-foreground text-sm'>Primary clinic</p>
            <p className='font-medium'>
              {doctor.primarySpecialty.department.name}
            </p>
          </div>
          <div className='space-y-1'>
            <p className='text-muted-foreground text-sm'>Consultation Fee</p>
            <p className='font-medium'>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doctor.consultationFee)}
            </p>
          </div>
          <div className='space-y-1'>
            <p className='text-muted-foreground text-sm'>Degree</p>
            <p className='font-medium'>
              {doctor.educations.map((e) => e.degree).join(', ') || 'N/A'}
            </p>
          </div>
          <div className='space-y-1'>
            <p className='text-muted-foreground text-sm'>Certifications</p>
            <p className='font-medium'>
              {doctor.certifications.map((c) => c.certificateName).join(', ') ||
                'N/A'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
