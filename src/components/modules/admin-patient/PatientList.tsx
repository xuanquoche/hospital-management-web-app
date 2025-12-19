'use client';

import { useEffect, useState } from 'react';

import { clientFetcher } from '@/lib/fetcher';
import { PatientListResponse } from '@/types/patient-api';

import { PatientDetailPanel } from './PatientDetailPanel';
import { PatientFilter } from './PatientFilter';
import { PatientListHeader } from './PatientListHeader';
import { PatientTable, Patient } from './PatientTable';

export function PatientList() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'inactive'>(
    'all'
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const fetchPatients = async (page = 1, status = 'all') => {
    setIsLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      });

      if (status === 'active') {
        params.append('isActive', 'true');
      } else if (status === 'inactive') {
        params.append('isActive', 'false');
      }

      const data = (await clientFetcher.get(
        `/admin/patients?${params.toString()}`
      )) as PatientListResponse;

      if (data.success) {
        const mappedPatients: Patient[] = data.data.map((apiPatient) => ({
          id: apiPatient.id,
          name: apiPatient.user.fullName,
          pid: apiPatient.user.username,
          avatarUrl: apiPatient.user.avatar,
          phone: apiPatient.user.phone,
          email: apiPatient.user.email,
          cmnd: '',
          insurance: apiPatient.healthInsuranceNumber ? 'BHYT' : 'None',
          lastVisit: '',
          lastVisitReason: '',
          status: apiPatient.user.isActive ? 'Active' : 'Inactive',
          tags: apiPatient.allergies ? apiPatient.allergies.split(', ') : [],
          dob: new Date(apiPatient.dateOfBirth).toLocaleDateString('vi-VN'),
          gender: apiPatient.gender,
          address: apiPatient.user.address,
          insuranceProvider: 'BHYT',
          insuranceNumber: apiPatient.healthInsuranceNumber,
          emergencyContact: apiPatient.emergencyContact,
          visitHistory: [],
        }));

        setPatients(mappedPatients);
        setPagination({
          page: data.meta.page,
          limit: data.meta.limit,
          totalItems: data.meta.totalItems,
          totalPages: data.meta.totalPages,
        });

        // Select first patient by default if none selected
        if (!selectedPatient && mappedPatients.length > 0) {
          setSelectedPatient(mappedPatients[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      // Handle error (e.g., show toast)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients(1, activeTab);
  }, [activeTab]);

  const handlePageChange = (newPage: number) => {
    fetchPatients(newPage, activeTab);
  };

  return (
    <div className='flex flex-col gap-6'>
      <PatientListHeader />
      <PatientFilter activeTab={activeTab} onTabChange={setActiveTab} />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <PatientTable
            patients={patients}
            selectedPatientId={selectedPatient?.id}
            onSelectPatient={setSelectedPatient}
            page={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            onPageChange={handlePageChange}
          />
        </div>
        <div>
          {selectedPatient && <PatientDetailPanel patient={selectedPatient} />}
        </div>
      </div>
    </div>
  );
}
