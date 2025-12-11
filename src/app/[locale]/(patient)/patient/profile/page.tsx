import React from 'react';

import { ProfileForm } from '@/components/modules/patient/profile/ProfileForm';

export default async function PatientProfilePage() {
  return (
    <div className='min-h-screen bg-slate-50/50 p-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Hồ sơ cá nhân</h1>
        <p className='mt-2 text-slate-500'>
          Cập nhật thông tin cá nhân và các chỉ số sức khỏe cơ bản của bạn.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
