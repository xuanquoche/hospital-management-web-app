import React from 'react';

import PortalHeader from '@/components/modules/Header/PortalHeader';
import PortalSidebar from '@/components/modules/Sidebar/PortalSidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='flex'>
    <PortalSidebar />
    <div className='w-[80%] overflow-y-auto'>
      <PortalHeader />
      {children}
    </div>
  </div>
);

export default AdminLayout;
