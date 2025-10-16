'use client';

import {
  LayoutDashboard,
  Users,
  MapPin,
  Briefcase,
  Layers,
  Box,
  ClipboardList,
  MessageSquare,
  UserCog,
  Building2,
  AppWindow,
} from 'lucide-react';
import { useState } from 'react';

import {
  DropdownMenu,
  MenuItem,
  SidebarHeader,
  SidebarSection,
} from '@/components/modules/sidebar/index';
import { PRIVATE_ROUTES } from '@/const/routes';

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>('');

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const itemMenu = [
    { link: '/patient', label: 'Patients' },
    { link: '#', label: 'Create patient' },
  ];
  const itemMenu2 = [
    { link: '/doctor', label: 'Doctor' },
    { link: '#', label: 'Create doctor' },
  ];

  return (
    <aside className='w-[20%] bg-white border-r border-gray-200 h-screen flex flex-col p-2 sticky top-0'>
      {/* Header */}
      <SidebarHeader />

      {/* Scrollable Menu */}
      <nav
        className='flex-1 overflow-y-auto p-3 text-sm  [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-thumb]:bg-blue-200 
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-track]:bg-gray-200'
      >
        <SidebarSection title='Main Menu'>
          <MenuItem
            icon={<LayoutDashboard className='h-4 w-4' />}
            label='Dashboard'
          />
          <MenuItem
            icon={<AppWindow className='h-4 w-4' />}
            label='Applications'
          />
          <MenuItem icon={<Layers className='h-4 w-4' />} label='Front End' />
          <MenuItem
            icon={<Box className='h-4 w-4' />}
            label='Department'
            link={PRIVATE_ROUTES.DEPARTMENT}
          />
        </SidebarSection>

        <SidebarSection title='Clinic'>
          <DropdownMenu
            label='Doctors'
            icon={<UserCog className='h-4 w-4' />}
            open={openMenu === 'Doctors'}
            onToggle={() => toggleMenu('Doctors')}
            items={itemMenu2}
          />
          <DropdownMenu
            label='Patients'
            icon={<Users className='h-4 w-4' />}
            open={openMenu === 'Patients'}
            onToggle={() => toggleMenu('Patients')}
            items={itemMenu}
          />
          <MenuItem icon={<MapPin className='h-4 w-4' />} label='Locations' />
          <MenuItem icon={<Briefcase className='h-4 w-4' />} label='Services' />
          <MenuItem
            icon={<Layers className='h-4 w-4' />}
            label='Specializations'
          />
          <MenuItem
            icon={<ClipboardList className='h-4 w-4' />}
            label='Assets'
          />
          <MenuItem icon={<Box className='h-4 w-4' />} label='Activities' />
          <MenuItem
            icon={<MessageSquare className='h-4 w-4' />}
            label='Messages'
          />
        </SidebarSection>

        <SidebarSection title='HRM'>
          <MenuItem icon={<Users className='h-4 w-4' />} label='Staffs' />
          <MenuItem
            icon={<Building2 className='h-4 w-4' />}
            label='Departments'
          />
        </SidebarSection>
      </nav>
    </aside>
  );
}
