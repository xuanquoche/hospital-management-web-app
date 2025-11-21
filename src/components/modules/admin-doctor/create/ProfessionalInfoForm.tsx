import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  primarySpecialty: z.string().min(1, {
    message: 'Please select a primary specialty.',
  }),
  subSpecialty: z.string().optional(),
  professionalTitle: z.string().optional(),
  experience: z.string().min(1, {
    message: 'Please enter years of experience.',
  }),
  consultationFee: z.string().min(1, {
    message: 'Please enter consultation fee.',
  }),
  currency: z.string().min(1, {
    message: 'Please select a currency.',
  }),
});

interface ProfessionalInfoFormProps {
  onComplete: () => void;
}

export const ProfessionalInfoForm: React.FC<ProfessionalInfoFormProps> = ({
  onComplete,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primarySpecialty: '',
      subSpecialty: '',
      professionalTitle: '',
      experience: '',
      consultationFee: '',
      currency: 'USD',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onComplete();
  }

  return (
    <div className="flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Professional details</h2>
          <p className="text-sm text-slate-500">Specialty, experience, and fee information.</p>
        </div>
        <span className="text-xs font-medium text-slate-400">Required</span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="primarySpecialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary specialty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subSpecialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-specialty (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Interventional cardiology" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="professionalTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional title (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Senior Consultant" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of experience</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter years" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consultationFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Consultation fee</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 80" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing currency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="VND">VND (₫)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            <div className="text-sm text-slate-500">
              <p className="font-medium text-slate-900">Unsaved changes</p>
              <p>Review specialty, experience and fee before saving.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="ghost" className="text-slate-600">
                Discard
              </Button>
              <Button type="button" variant="outline" className="bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100">
                Save as draft
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                Save & activate
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
