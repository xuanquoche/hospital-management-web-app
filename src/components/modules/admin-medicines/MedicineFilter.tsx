import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { clientFetcher } from '@/lib/fetcher';
import { Category } from '@/types/medicine';

interface MedicineFilterProps {
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onExpiryDateBeforeChange: (value: string) => void;
  onExpiryDateAfterChange: (value: string) => void;
}

export function MedicineFilter({
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onExpiryDateBeforeChange,
  onExpiryDateAfterChange,
}: MedicineFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await clientFetcher.get('/admin/medicine-categories');
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='bg-card rounded-xl border p-4 shadow-sm'>
      <div className='mb-4 text-sm font-medium text-muted-foreground'>
        Filters
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-5'>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Search medicine
          </label>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Tên thuốc hoặc hoạt chất...'
              className='pl-9'
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Status
          </label>
          <Select onValueChange={onStatusChange} defaultValue='all'>
            <SelectTrigger>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All statuses</SelectItem>
              <SelectItem value='IN_STOCK'>In stock</SelectItem>
              <SelectItem value='LOW_STOCK'>Low stock</SelectItem>
              <SelectItem value='OUT_OF_STOCK'>Out of stock</SelectItem>
              <SelectItem value='EXPIRED'>Expired</SelectItem>
              <SelectItem value='DISPOSED'>Disposed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Expiry After
          </label>
          <Input
            type='date'
            onChange={(e) => onExpiryDateAfterChange(e.target.value)}
          />
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Expiry Before
          </label>
          <Input
            type='date'
            onChange={(e) => onExpiryDateBeforeChange(e.target.value)}
          />
        </div>
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Category
          </label>
          <Select onValueChange={onCategoryChange} defaultValue='all'>
            <SelectTrigger>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
