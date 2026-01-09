import { SessionProvider } from 'next-auth/react';
import React from 'react';

import PortalHeader from '@/components/modules/Header/PortalHeader';
import PortalSidebar from '@/components/modules/Sidebar/PortalSidebar';

const PatientLayout = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <div className='flex'>
      <PortalSidebar />
      <div className='w-[80%]'>
        <PortalHeader badgeText='patient' />
        {children}
      </div>
    </div>
  </SessionProvider>
);

export default PatientLayout;
