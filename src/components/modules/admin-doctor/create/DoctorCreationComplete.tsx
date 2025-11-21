import React from 'react';
import { CheckCircle2, Calendar, Clock, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export const DoctorCreationComplete = () => {
  const router = useRouter();

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctor profile activated</h1>
          <p className="text-slate-500">
            Dr. Sarah Thompson is now visible in search and can receive appointments.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/portal')}
        >
          Back to doctor list
        </Button>
      </div>

      {/* Success Message */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Save & activate successful</h3>
            <p className="text-sm text-green-700">
              All personal, professional, education, awards and certification details have been
              saved.
            </p>
          </div>
          <div className="ml-auto">
            <Badge className="bg-green-600 hover:bg-green-700">Active</Badge>
          </div>
        </div>
      </div>

      {/* Doctor Overview */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Doctor overview</h2>
          <span className="text-xs text-slate-400">Read-only summary</span>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-slate-500 mb-1">Name</p>
            <p className="font-medium text-slate-900">Dr. Sarah Thompson</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Specialty</p>
            <p className="font-medium text-slate-900">Cardiology</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Experience</p>
            <p className="font-medium text-slate-900">12 years</p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 mb-4">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Primary license</p>
              <p className="font-medium text-slate-900">HN-12345 - Medical Practice License</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Issuing authority</p>
              <p className="font-medium text-slate-900">Vietnam Ministry of Health</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">License status</p>
              <p className="font-medium text-slate-900">
                <span className="text-green-600">Verified</span> - No expiry set
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
            Board-certified
          </Badge>
          <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
            Cardio CPD
          </Badge>
          <Badge variant="secondary" className="bg-teal-50 text-teal-700 hover:bg-teal-100">
            Telehealth enabled
          </Badge>
        </div>
      </div>

      {/* Next Steps */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Next best step</h2>
        <p className="text-sm text-slate-500 mb-4">Set availability to begin accepting appointments.</p>

        <div className="flex gap-3">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Clock className="mr-2 h-4 w-4" />
            Add time slots
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Open doctor calendar
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Adjust booking rules
          </Button>
        </div>
      </div>
    </div>
  );
};
