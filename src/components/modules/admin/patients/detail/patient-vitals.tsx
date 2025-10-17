import {
  SquareActivity,
  Activity,
  Droplet,
  Component,
  Weight,
  Thermometer,
} from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PatientVitalsProps {
  bloodPressure?: string;
  heartRate?: string;
  spo2?: string;
  temperature?: string;
  respiratoryRate?: string;
  weight?: string;
}

export default function PatientVitals({
  bloodPressure = '100/67 mmHg',
  heartRate = '89 bpm',
  spo2 = '98%',
  temperature = '101 C',
  respiratoryRate = '24 rpm',
  weight = '100 kg',
}: PatientVitalsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vital Signs</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-4 text-sm'>
        <div className='flex items-center gap-2'>
          <Droplet />
          <div>
            <p className='text-gray-500'>Blood Pressure</p>
            <p>{bloodPressure}</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <SquareActivity />
          <div>
            <p className='text-gray-500'>Heart Rate</p>
            <p>{heartRate}</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Component />
          <div>
            <p className='text-gray-500'>SPO2</p>
            <p>{spo2}</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Thermometer />
          <div>
            <p className='text-gray-500'>Temperature</p>
            <p>{temperature}</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Activity />
          <div>
            <p className='text-gray-500'>Respiratory Rate</p>
            <p>{respiratoryRate}</p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Weight />
          <div>
            <p className='text-gray-500'>Weight</p>
            <p>{weight}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
