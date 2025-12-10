import { DashboardContent } from '@/components/modules/patient/dashboard/DashboardContent';

export default async function PatientDashboardPage() {
  return (
    <div className='flex min-h-screen flex-col bg-slate-50/30'>
      <DashboardContent />
    </div>
  );
}
