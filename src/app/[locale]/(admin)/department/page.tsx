'use client';

import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/common/button';
import DepartmentForm from '@/components/form/department-form';
import DepartmentTable from '@/components/modules/table/department-table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DepartmentStatus } from '@/const/enum';
import { clientFetcher } from '@/lib/fetcher';

type DepartmentItem = {
  id: number;
  name: string;
  status: DepartmentStatus;
};

type Department = {
  items: DepartmentItem[];
  pagination: {
    page: number;
    total: number;
    perPage: number;
    totalPages: number;
  };
};

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department>({
    items: [],
    pagination: { page: 1, total: 0, perPage: 5, totalPages: 0 },
  });
  const [name, setName] = useState('');
  const [status, setStatus] = useState<DepartmentStatus | ''>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState<DepartmentStatus | ''>('');

  const fetchDepartments = async (
    page: number = 1,
    limit: number = 5,
    searchNameValue: string = '',
    searchStatusValue: DepartmentStatus | '' = ''
  ) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (searchNameValue) params.append('search', searchNameValue);
      if (searchStatusValue) params.append('status', searchStatusValue);

      const res = await clientFetcher.get(`/departments?${params.toString()}`);
      setDepartments(res.data || []);
    } catch (err: any) {
      console.error('Error fetching departments:', err.message);
      toast.error('Failed to load departments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments(1, 5);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !status) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await clientFetcher.patch(`/departments/${editingId}`, {
          name,
          status,
        });
        toast.success('Department updated successfully.');
      } else {
        await clientFetcher.post('/departments', {
          name,
          status,
        });
        toast.success('Department created successfully.');
      }

      setName('');
      setStatus('');
      setEditingId(null);
      fetchDepartments(departments.pagination.page);
    } catch (err: any) {
      console.error('Error submitting department:', err.message);
      alert(err.message || 'Failed to save department.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dept: {
    id: number;
    name: string;
    status: DepartmentStatus;
  }) => {
    setEditingId(dept.id);
    setName(dept.name);
    setStatus(
      dept.status === 'Active'
        ? DepartmentStatus.ACTIVE
        : DepartmentStatus.INACTIVE
    );
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
      try {
        setLoading(true);
        await clientFetcher.delete(`/departments/${id}`);
        toast.success('Department deleted successfully.');
        fetchDepartments();
      } catch (err: any) {
        console.error('Error deleting department:', err.message);
        alert('Failed to delete department.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = () => {
    fetchDepartments(1, 5, searchName, searchStatus);
  };

  const handlePageChange = (newPage: number) => {
    if (
      newPage >= 1 &&
      newPage <= departments.pagination.totalPages &&
      newPage !== departments.pagination.page
    ) {
      fetchDepartments(newPage, 5, searchName, searchStatus);
    }
  };

  return (
    <div className='p-6 space-y-6'>
      {/* Search / Filter */}
      <Card className='max-w-xl shadow-md'>
        <CardContent className='space-y-4'>
          <div className='flex flex-col sm:flex-row gap-2 items-center'>
            <div className='flex-1'>
              <Label>Name</Label>
              <Input
                placeholder='Search by name'
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>

            <div className='w-40'>
              <Label>Status</Label>
              <Select
                value={searchStatus}
                onValueChange={(value) =>
                  setSearchStatus(value as DepartmentStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DepartmentStatus.ACTIVE}>
                    Active
                  </SelectItem>
                  <SelectItem value={DepartmentStatus.INACTIVE}>
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='pt-6'>
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <DepartmentForm
        name={name}
        status={status}
        editingId={editingId}
        onNameChange={setName}
        onStatusChange={setStatus}
        onSubmit={handleSubmit}
      />

      <DepartmentTable
        departments={departments || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        isLoading={loading}
      />

      {loading && <p className='text-sm text-gray-500'>Loading...</p>}
    </div>
  );
}
