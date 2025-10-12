'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DepartmentStatus } from '@/const/enum';

type DepartmentFormProps = {
  name: string;
  status: DepartmentStatus | '';
  editingId: number | null;
  onNameChange: (value: string) => void;
  onStatusChange: (value: DepartmentStatus) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function DepartmentForm({
  name,
  status,
  editingId,
  onNameChange,
  onStatusChange,
  onSubmit,
}: DepartmentFormProps) {
  const t = useTranslations('department');

  return (
    <Card className='max-w-xl shadow-md'>
      <CardHeader>
        <CardTitle>
          {editingId ? t('editDepartment') : t('addDeparment')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className='space-y-4'>
          <div>
            <Label className='mb-2'>{t('name')}</Label>
            <Input
              placeholder={t('enterDepartmentName')}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>

          <div>
            <Label className='mb-2'>{t('status')}</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                onStatusChange(value as DepartmentStatus)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t('selectStatus')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DepartmentStatus.ACTIVE}>
                  {t('active')}
                </SelectItem>
                <SelectItem value={DepartmentStatus.INACTIVE}>
                  {t('inactive')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-end'>
            <Button type='submit'>
              {editingId ? t('editBtn') : t('addBtn')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
