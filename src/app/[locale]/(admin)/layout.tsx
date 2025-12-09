import React from 'react';

import PortalHeader from '@/components/modules/Header/PortalHeader';
import { SessionProvider } from "next-auth/react"

import PortalSidebar from '@/components/modules/Sidebar/PortalSidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <SessionProvider>
    <div className='flex'>
      <PortalSidebar />
      <div className='w-[80%] overflow-y-auto'>
        <PortalHeader />
        {children}
      </div>
    </div>
  </SessionProvider>
);

export default AdminLayout;
