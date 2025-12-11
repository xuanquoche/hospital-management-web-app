import { SessionProvider } from 'next-auth/react';
import React from 'react';

import PortalSidebar from '@/components/modules/Sidebar/PortalSidebar';

const DoctorLayout = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <div className='flex h-screen'>
      <PortalSidebar />
      <div className='w-[100%] overflow-scroll'>{children}</div>
    </div>
  </SessionProvider>
);

export default DoctorLayout;
