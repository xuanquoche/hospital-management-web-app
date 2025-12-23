'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CancellationReasonLabels, CancellationReason } from '@/const/enum';
import { clientFetcher } from '@/lib/fetcher';

const cancelSchema = z.object({
  reason: z.string().min(1, 'Please select a reason'),
  note: z.string().min(1, 'Please provide a note'),
});

type CancelFormValues = z.infer<typeof cancelSchema>;

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
  onSuccess?: () => void;
}

export function CancelAppointmentModal({ isOpen, onClose, appointmentId, onSuccess }: CancelAppointmentModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CancelFormValues>({
    resolver: zodResolver(cancelSchema),
    defaultValues: {
      reason: 'PATIENT_REQUEST',
      note: '',
    },
  });

  const onSubmit = async (values: CancelFormValues) => {
    try {
      setIsLoading(true);
      await clientFetcher.patch(`/admin/appointments/${appointmentId}/cancel`, values);
      toast.success('Appointment cancelled successfully');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
      toast.error('Failed to cancel appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Cancel Appointment</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='reason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a reason' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(CancellationReason).map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {CancellationReasonLabels[reason as CancellationReason]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter cancellation note...' className='resize-none' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='button' variant='outline' onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type='submit' variant='destructive' disabled={isLoading}>
                {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
