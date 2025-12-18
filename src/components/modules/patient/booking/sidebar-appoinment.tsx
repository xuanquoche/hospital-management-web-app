'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon, CheckCircle2Icon } from 'lucide-react';
import Image from 'next/image';

import { useAppointmentStore } from '@/store/use-appointment-store';

export default function Sidebar() {
  const { currentStep } = useAppointmentStore();

  const steps = [
    { key: 'date', label: 'Datum wählen', icon: CalendarIcon },
    { key: 'time', label: 'Uhrzeit', icon: ClockIcon },
    { key: 'info', label: 'Information eingeben', icon: UserIcon },
    { key: 'complete', label: 'Fertig', icon: CheckCircle2Icon },
  ];

  return (
    <aside className='w-80 bg-white border-r h-screen p-6 flex flex-col items-center'>
      <div className='flex flex-col items-center mb-10'>
        <div className='w-16 h-16 rounded-full overflow-hidden border'>
          <Image src='/images/doctor.png' alt='Doctor' className='object-cover w-full h-full' width={64} height={64} />
        </div>
        <h2 className='font-semibold mt-3'>Alex Suprun</h2>
        <p className='text-sm text-gray-500'>Founder & Head of IT</p>
      </div>

      <div className='relative w-full'>
        <div className='absolute left-[22px] top-6 bottom-6 w-[2px] bg-gray-200'></div>
        <div className='flex flex-col space-y-8'>
          {steps.map(({ key, label, icon: Icon }, index) => {
            const isActive = currentStep === index + 1;
            const isCompleted = currentStep > index + 1;

            return (
              <motion.div
                key={key}
                className='flex items-center space-x-3 relative z-10'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                    isActive
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : isCompleted
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-600'
                        : 'bg-white text-gray-400 border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className={`font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500'}`}>{label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
