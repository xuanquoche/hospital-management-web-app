'use client';

import React, { useState } from 'react';

import DepartmentForm from '@/components/form/department-form';
import DepartmentTable from '@/components/modules/table/department-table';
type Department = {
  id: number;
  name: string;
  status: 'Active' | 'Inactive';
};

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: 'Cardiology', status: 'Active' },
    { id: 2, name: 'Neurology', status: 'Inactive' },
    { id: 3, name: 'Pediatrics', status: 'Active' },
  ]);

  const [name, setName] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive' | ''>('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !status) return alert('Please fill in all fields.');

    if (editingId) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === editingId ? { ...dept, name, status } : dept
        )
      );
      setEditingId(null);
    } else {
      const newDept: Department = {
        id: departments.length + 1,
        name,
        status: status as 'Active' | 'Inactive',
      };
      setDepartments((prev) => [...prev, newDept]);
    }

    setName('');
    setStatus('');
  };

  const handleEdit = (dept: Department) => {
    setEditingId(dept.id);
    setName(dept.name);
    setStatus(dept.status);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this department?')) {
      setDepartments((prev) => prev.filter((dept) => dept.id !== id));
    }
  };

  return (
    <div className='p-6 space-y-6'>
      {/* Form */}
      <DepartmentForm
        name={name}
        status={status}
        editingId={editingId}
        onNameChange={setName}
        onStatusChange={setStatus}
        onSubmit={handleSubmit}
      />

      {/* Data Table */}
      <DepartmentTable
        departments={departments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
