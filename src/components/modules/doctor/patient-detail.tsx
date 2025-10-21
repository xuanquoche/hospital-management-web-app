'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PatientDetails({ patient }: { patient: any }) {
  if (!patient) {
    return (
      <div className='bg-white rounded-xl shadow p-6 flex items-center justify-center text-muted-foreground min-h-[400px]'>
        <div className='text-center'>
          <div className='text-lg font-semibold mb-2'>No patient selected</div>
          <div className='text-sm'>
            Select a patient from the list to view details
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-xl shadow p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-semibold'>Patients Details</h3>
        <Button>View Details</Button>
      </div>

      {/* Patient header info */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-xl p-4'>
        <div className='flex items-center gap-4'>
          <Image
            src='/images/patient.png'
            alt={patient.name}
            width={60}
            height={60}
            className='rounded-full'
          />
          <div>
            <h4 className='text-lg font-bold'>{patient.name}</h4>
            <p className='text-sm text-muted-foreground'>
              {patient.age} Years {patient.sex}
            </p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:gap-12 text-sm'>
          <div>
            <div className='text-muted-foreground font-medium'>Email</div>
            <div>{patient.email}</div>
          </div>
          <div className='hidden md:block h-8 w-px bg-gray-200'></div>
          <div>
            <div className='text-muted-foreground font-medium'>Phone</div>
            <div>{patient.phone}</div>
          </div>
        </div>
      </div>

      {/* Basic info */}
      <div className='grid md:grid-cols-2 gap-6 mt-6 text-sm'>
        <div className='space-y-2'>
          <div>
            BP : <span className='font-medium'>{patient.bp}</span>
          </div>
          <div>
            Pulse : <span className='font-medium'>{patient.pulse}</span>
          </div>
          <div>
            Weight : <span className='font-medium'>{patient.weight}</span>
          </div>
          <div className='mt-3'>
            <span className='font-semibold'>Test:</span>
            <ul className='mt-2 list-disc list-inside space-y-1'>
              {patient.testsWithPrescriptions.map((t: any, i: number) => (
                <li key={i}>{t.test}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className='space-y-2'>
          <div>Last Checked: {patient.lastChecked}</div>
          <div>
            Prescription -{' '}
            <span className='font-medium'>{patient.prescription}</span>
          </div>
          <div className='mt-3'>
            <div className='font-semibold'>Observation:</div>
            <p className='bg-gray-50 border p-2 rounded-md text-sm'>
              {patient.observation}
            </p>
          </div>
        </div>
      </div>

      {/* Prescription */}
      <div className='mt-6'>
        <div className='font-semibold mb-2'>Prescription:</div>
        <div className='border rounded-md p-4 space-y-2 text-sm'>
          {patient.testsWithPrescriptions.map((item: any, index: number) => (
            <div key={index}>
              {item.test}: {item.prescription}
            </div>
          ))}
        </div>
      </div>

      {/* Reports */}
      <div className='mt-8'>
        <div className='grid md:grid-cols-3 gap-4'>
          {/* ECG Report */}
          <Card className='p-3'>
            <CardContent className='flex flex-col items-center gap-2'>
              <div className='font-semibold mb-2 self-start'>ECG Report</div>
              <Image
                src='/images/doctor.png'
                alt='ECG Report'
                width={240}
                height={150}
                className='rounded-md border'
              />
            </CardContent>
          </Card>

          {/* Blood Report */}
          <Card className='p-3'>
            <CardContent className='flex flex-col'>
              <div className='font-semibold mb-2'>Blood Report</div>
              {patient.labResults.map((result: any, i: number) => (
                <div
                  key={i}
                  className='flex justify-between border-b last:border-0 py-1 text-sm'
                >
                  <span>{result.test}</span>
                  <span>
                    {result.value} - [{result.unit}]
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* X-Ray Report */}
          <Card className='p-3'>
            <CardContent className='flex flex-col items-center gap-2'>
              <div className='font-semibold mb-2 self-start'>X-Ray Report</div>
              <Image
                src='/images/doctor.png'
                alt='X-Ray Report'
                width={240}
                height={150}
                className='rounded-md border'
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
