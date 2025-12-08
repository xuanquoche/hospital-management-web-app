'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SpecialtyFilters from '@/components/modules/admin-specialties/SpecialtyFilters';
import SpecialtyList from '@/components/modules/admin-specialties/SpecialtyList';
import CreateSpecialtyModal from '@/components/modules/admin-specialties/CreateSpecialtyModal';

const AdminSpecialtiesPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className='flex flex-col gap-6 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-slate-900'>Specialties</h1>
          <p className='text-sm text-slate-500'>
            Manage medical specialties and their departments.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className='bg-teal-600 hover:bg-teal-700 text-white gap-2'
        >
          <Plus className='h-4 w-4' />
          Create Specialty
        </Button>
      </div>

      <SpecialtyFilters />

      <SpecialtyList key={refreshKey} />

      <CreateSpecialtyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default AdminSpecialtiesPage;
