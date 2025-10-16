'use client';

import { CreatePatientForm } from '@/components/form/create-patient-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='!max-w-7xl w-[70%] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
        </DialogHeader>

        <CreatePatientForm onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
