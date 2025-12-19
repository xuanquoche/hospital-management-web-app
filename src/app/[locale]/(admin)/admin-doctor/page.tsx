import React from 'react';

import DoctorList from '@/components/modules/admin-portal/Content/DoctorList/DoctorList';
import Widgets from '@/components/modules/admin-portal/Content/Widgets/Widgets';
import PortalLayout from '@/components/modules/admin-portal/PortalLayout';

export default async function AdminPortalPage() {
  return (
    <PortalLayout>
      <div className='grid grid-cols-12 gap-8'>
        <div className='col-span-9'>
          <DoctorList />
        </div>
        <div className='col-span-3'>
          <Widgets />
        </div>
      </div>
    </PortalLayout>
  );
}
