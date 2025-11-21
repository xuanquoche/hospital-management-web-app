import React from 'react';

interface PortalLayoutProps {
  children: React.ReactNode;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-slate-50 font-sans'>
      <div className='flex flex-1 flex-col'>
        <main className='flex-1 p-8'>{children}</main>
      </div>
    </div>
  );
};

export default PortalLayout;
