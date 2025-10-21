import React from 'react';

import { ClientSidebar } from '@/components/modules/client-sidebar/client-sidebar';

const DoctorLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='flex h-screen'>
    <ClientSidebar />
    <div className='w-[100%] overflow-scroll'>{children}</div>
  </div>
);

export default DoctorLayout;
