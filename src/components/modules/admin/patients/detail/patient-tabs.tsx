'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import PatientAppointments from './patient-appoinments';

export default function PatientTabs() {
  return (
    <Tabs defaultValue='appointments' className='w-full'>
      <TabsList>
        <TabsTrigger value='appointments'>Appointments</TabsTrigger>
        <TabsTrigger value='transactions'>Transactions</TabsTrigger>
      </TabsList>

      <TabsContent value='appointments'>
        <PatientAppointments />
      </TabsContent>

      <TabsContent value='transactions'>
        <div className='p-4 text-gray-500'>No transactions available.</div>
      </TabsContent>
    </Tabs>
  );
}
