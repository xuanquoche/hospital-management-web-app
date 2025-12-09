'use client';

import { MedicineFilter } from './MedicineFilter';
import { MedicineListHeader } from './MedicineListHeader';
import { MedicineRightPanel } from './MedicineRightPanel';
import { MedicineTable, Medicine } from './MedicineTable';

// Mock data
const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    description: 'Giảm đau, hạ sốt',
    batchId: 'PARA-0825',
    quantity: 1200,
    unit: 'Tablets',
    price: '$0.12',
    expiryDate: '30 Nov 2025',
    status: 'In stock',
  },
  {
    id: '2',
    name: 'Amoxicillin 500mg',
    description: 'Kháng sinh',
    batchId: 'AMOX-0825',
    quantity: 180,
    unit: 'Capsules',
    price: '$0.25',
    expiryDate: '15 Sep 2025',
    status: 'Low stock',
  },
  {
    id: '3',
    name: 'Metformin 850mg',
    description: 'Đái tháo đường type 2',
    batchId: 'METF-0724',
    quantity: 0,
    unit: 'Tablets',
    price: '$0.30',
    expiryDate: '02 Aug 2024',
    status: 'Expired',
  },
  {
    id: '4',
    name: 'Omeprazole 20mg',
    description: 'Giảm tiết acid dạ dày',
    batchId: 'OMEP-1025',
    quantity: 560,
    unit: 'Capsules',
    price: '$0.20',
    expiryDate: '12 Jan 2026',
    status: 'In stock',
  },
  {
    id: '5',
    name: 'Cefixime 100mg',
    description: 'Kháng sinh thế hệ 3',
    batchId: 'CEFI-0925-04',
    quantity: 90,
    unit: 'Sachets',
    price: '$0.85',
    expiryDate: '08 Oct 2025',
    status: 'Low stock',
  },
  {
    id: '6',
    name: 'Vitamin C 500mg',
    description: 'Tăng đề kháng',
    batchId: 'VITC-1125-02',
    quantity: 2300,
    unit: 'Tablets',
    price: '$0.08',
    expiryDate: '22 Dec 2025',
    status: 'In stock',
  },
];

export function MedicineList() {
  return (
    <div className='flex flex-col gap-6'>
      <MedicineListHeader />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
        <div className='lg:col-span-3 space-y-6'>
          <MedicineFilter />
          <MedicineTable medicines={mockMedicines} />
        </div>
        <div>
          <MedicineRightPanel />
        </div>
      </div>
    </div>
  );
}
