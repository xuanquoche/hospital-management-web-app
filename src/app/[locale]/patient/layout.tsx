import React from 'react';

import { ClientSidebar } from '@/components/modules/client-sidebar/client-sidebar';

const PatientLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='flex h-screen'>
    <ClientSidebar />
    <div className='w-[80%]'>{children}</div>
  </div>
);

export default PatientLayout;
