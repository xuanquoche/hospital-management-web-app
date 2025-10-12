import { DoctorHeader } from '@/components/modules/admin/doctor/doctor-header';
import { DoctorList } from '@/components/modules/admin/doctor/doctor-list';

export default function DoctorsPage() {
  return (
    <div className='p-6'>
      <DoctorHeader />
      <DoctorList />
    </div>
  );
}
