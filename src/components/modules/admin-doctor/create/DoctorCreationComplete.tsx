import {
  CheckCircle2,
  Calendar,
  Clock,
  Settings,
  ShieldCheck,
  User,
  GraduationCap,
  Award,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreatedDoctorData } from '@/types/api-responses';

interface DoctorCreationCompleteProps {
  doctor: CreatedDoctorData;
}

export const DoctorCreationComplete = ({
  doctor,
}: DoctorCreationCompleteProps) => {
  const router = useRouter();
  const t = useTranslations('Admin.DoctorCreate.Complete');

  return (
    <div className='flex-1 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>{t('title')}</h1>
          <p className='text-slate-500'>{t('description')}</p>
        </div>
        <Button variant='outline' onClick={() => router.push('/portal')}>
          {t('backToList')}
        </Button>
      </div>

      {/* Success Message */}
      <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
        <div className='flex items-start gap-3'>
          <CheckCircle2 className='mt-0.5 h-5 w-5 text-green-600' />
          <div>
            <h3 className='font-semibold text-green-900'>
              {t('successTitle')}
            </h3>
            <p className='text-sm text-green-700'>{t('successMessage')}</p>
          </div>
          <div className='ml-auto'>
            <Badge className='bg-green-600 hover:bg-green-700'>
              {t('active')}
            </Badge>
          </div>
        </div>
      </div>

      {/* Default Password Alert */}
      {doctor.defaultPassword && (
        <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
          <div className='flex items-start gap-3'>
            <ShieldCheck className='mt-0.5 h-5 w-5 text-yellow-600' />
            <div>
              <h3 className='font-semibold text-yellow-900'>
                Default Password
              </h3>
              <p className='text-sm text-yellow-700'>
                Please share this temporary password with the doctor securely.
              </p>
              <div className='mt-2 rounded bg-white p-2 font-mono text-sm font-bold text-slate-900 border border-yellow-200 inline-block'>
                {doctor.defaultPassword}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Overview */}
      <div className='rounded-lg border border-slate-200 bg-white p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-slate-900'>
            {t('overviewTitle')}
          </h2>
          <span className='text-xs text-slate-400'>{t('readOnly')}</span>
        </div>

        <div className='grid grid-cols-3 gap-6 mb-6'>
          <div>
            <p className='mb-1 text-sm text-slate-500'>{t('name')}</p>
            <p className='font-medium text-slate-900'>{doctor.user.fullName}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-slate-500'>{t('specialty')}</p>
            <p className='font-medium text-slate-900'>
              {doctor.primarySpecialty.name}
            </p>
          </div>
          <div>
            <p className='mb-1 text-sm text-slate-500'>{t('experience')}</p>
            <p className='font-medium text-slate-900'>
              {doctor.yearsOfExperience} years
            </p>
          </div>
        </div>

        <div className='border-t border-slate-100 pt-4 mb-4'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Certifications Preview */}
            {doctor.certifications.length > 0 && (
              <div>
                <h3 className='mb-3 flex items-center text-sm font-medium text-slate-900'>
                  <ShieldCheck className='mr-2 h-4 w-4 text-slate-500' />
                  Certifications
                </h3>
                <ul className='space-y-2'>
                  {doctor.certifications.slice(0, 3).map((cert) => (
                    <li
                      key={cert.id}
                      className='flex items-center text-sm text-slate-600'
                    >
                      <span className='mr-2 h-1.5 w-1.5 rounded-full bg-green-500' />
                      {cert.certificateName}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Educations Preview */}
            {doctor.educations.length > 0 && (
              <div>
                <h3 className='mb-3 flex items-center text-sm font-medium text-slate-900'>
                  <GraduationCap className='mr-2 h-4 w-4 text-slate-500' />
                  Education
                </h3>
                <ul className='space-y-2'>
                  {doctor.educations.slice(0, 3).map((edu) => (
                    <li
                      key={edu.id}
                      className='flex items-center text-sm text-slate-600'
                    >
                      <span className='mr-2 h-1.5 w-1.5 rounded-full bg-blue-500' />
                      {edu.degree} - {edu.school}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          {doctor.awards.length > 0 && (
            <Badge
              variant='secondary'
              className='bg-purple-50 text-purple-700 hover:bg-purple-100 gap-1'
            >
              <Award className='h-3 w-3' />
              {doctor.awards.length} Awards
            </Badge>
          )}
          <Badge
            variant='secondary'
            className='bg-blue-50 text-blue-700 hover:bg-blue-100 gap-1'
          >
            <User className='h-3 w-3' />
            Role: {doctor.user.role}
          </Badge>
        </div>
      </div>

      {/* Next Steps */}
      <div className='rounded-lg border border-slate-200 bg-white p-6'>
        <h2 className='mb-2 text-lg font-semibold text-slate-900'>
          {t('nextStepTitle')}
        </h2>
        <p className='mb-4 text-sm text-slate-500'>
          {t('nextStepDescription')}
        </p>

        <div className='flex gap-3'>
          <Button className='bg-teal-600 hover:bg-teal-700'>
            <Clock className='mr-2 h-4 w-4' />
            {t('addTimeSlots')}
          </Button>
          <Button variant='outline'>
            <Calendar className='mr-2 h-4 w-4' />
            {t('openCalendar')}
          </Button>
          <Button variant='outline'>
            <Settings className='mr-2 h-4 w-4' />
            {t('adjustRules')}
          </Button>
        </div>
      </div>
    </div>
  );
};
