import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clientFetcher } from '@/lib/fetcher';

interface DoctorFiltersProps {
  onSearch: (query: string) => void;
  onSpecialtyChange: (value: string) => void;
}

interface Specialty {
  id: string;
  name: string;
}

const DoctorFilters: React.FC<DoctorFiltersProps> = ({
  onSearch,
  onSpecialtyChange,
}) => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSpecialties = async () => {
      setLoading(true);
      try {
        const response = await clientFetcher.get(
          '/admin/specialties?page=1&limit=100'
        );
        if (response.data) {
          setSpecialties(response.data);
        }
      } catch (error) {
        console.error('Error fetching specialties:', error);
        toast.error('Failed to load specialties');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  // Debounce search input locally
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  return (
    <div className='mb-6 rounded-lg border border-slate-100 bg-white p-4 shadow-sm'>
      <div className='mb-4'>
        <h3 className='text-sm font-medium text-slate-500'>Filters</h3>
      </div>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-6'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Search by name
          </label>
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <Input
              placeholder='Type doctor name...'
              className='h-10 w-full border-slate-200 pl-10 focus-visible:ring-teal-500'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className='col-span-3'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Specialty
          </label>
          <Select defaultValue='all' onValueChange={onSpecialtyChange}>
            <SelectTrigger className='h-10 border-slate-200 focus:ring-teal-500'>
              <SelectValue
                placeholder={loading ? 'Loading...' : 'Select specialty'}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All specialties</SelectItem>
              {specialties.map((specialty) => (
                <SelectItem key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-3'>
          <label className='mb-1.5 block text-xs font-medium text-slate-500'>
            Status
          </label>
          <Select defaultValue='all'>
            <SelectTrigger className='h-10 border-slate-200 focus:ring-teal-500'>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
              <SelectItem value='on-leave'>On leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilters;
