import { SessionProvider } from 'next-auth/react';
import React from 'react';

import PortalHeader from '@/components/modules/Header/PortalHeader';
import PortalSidebar from '@/components/modules/Sidebar/PortalSidebar';

const DoctorLayout = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <div className='flex h-screen'>
      <PortalSidebar />
      <div className='w-[80%] overflow-y-auto'>
        <PortalHeader title='Doctor Portal' badgeText='Doctor' />
        {children}
      </div>
    </div>
  </SessionProvider>
);

export default DoctorLayout;
