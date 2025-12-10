import { SessionProvider } from 'next-auth/react';
import React from 'react';

import PortalHeader from '@/components/modules/Header/PortalHeader';
import PortalSidebar from '@/components/modules/Sidebar/PortalSidebar';

const PatientLayout = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <div className='flex'>
      <PortalSidebar />
      <div className='w-[80%]'>
        <PortalHeader title='Xin chào, Minh Anh' badgeText='Bệnh nhân' />
        {children}
      </div>
    </div>
  </SessionProvider>
);

export default PatientLayout;
