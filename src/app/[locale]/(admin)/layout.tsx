import React from 'react';

import Header from '@/components/modules/header/header';
import Sidebar from '@/components/modules/sidebar/sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <div className='flex'>
    <Sidebar />
    <div className='w-[80%] overflow-y-auto'>
      <Header />
      {children}
    </div>
  </div>
);

export default AdminLayout;
