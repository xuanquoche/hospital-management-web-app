'use client';

import { motion } from 'framer-motion';
import {
  Stethoscope,
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  Pill,
  Ambulance,
} from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'General Medicine',
    description:
      'Comprehensive primary care for all ages with preventive health screenings.',
    color: 'cyan',
  },
  {
    icon: Heart,
    title: 'Cardiology',
    description:
      'Advanced cardiac care with state-of-the-art diagnostic equipment.',
    color: 'rose',
  },
  {
    icon: Brain,
    title: 'Neurology',
    description: 'Expert treatment for brain and nervous system disorders.',
    color: 'purple',
  },
  {
    icon: Bone,
    title: 'Orthopedics',
    description:
      'Specialized care for bones, joints, and musculoskeletal conditions.',
    color: 'amber',
  },
  {
    icon: Baby,
    title: 'Pediatrics',
    description:
      'Gentle, compassionate care for infants, children, and adolescents.',
    color: 'pink',
  },
  {
    icon: Eye,
    title: 'Ophthalmology',
    description: 'Complete eye care from routine exams to advanced surgery.',
    color: 'blue',
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    description:
      '24/7 pharmacy services with prescription and OTC medications.',
    color: 'emerald',
  },
  {
    icon: Ambulance,
    title: 'Emergency Care',
    description:
      'Round-the-clock emergency services with rapid response teams.',
    color: 'red',
  },
];

const colorVariants: Record<
  string,
  { bg: string; icon: string; border: string }
> = {
  cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-100' },
  rose: { bg: 'bg-rose-50', icon: 'text-rose-600', border: 'border-rose-100' },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    border: 'border-purple-100',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    border: 'border-amber-100',
  },
  pink: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-100' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    border: 'border-emerald-100',
  },
  red: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100' },
};

export function Features() {
  return (
    <section id='services' className='relative py-24 bg-white'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:64px_64px] opacity-50' />

      <div className='relative z-10 max-w-7xl mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <span className='inline-block px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium mb-4'>
            Our Services
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-4'>
            Comprehensive{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500'>
              Medical Services
            </span>
          </h2>
          <p className='text-slate-600 text-lg max-w-2xl mx-auto'>
            From routine checkups to specialized treatments, we offer a full
            range of healthcare services
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {services.map((service, index) => {
            const colors = colorVariants[service.color] || colorVariants.cyan;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='group relative cursor-pointer'
              >
                <div className='relative h-full bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300'>
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border mb-4`}
                  >
                    <service.icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h3 className='text-lg font-semibold text-slate-800 mb-2'>
                    {service.title}
                  </h3>
                  <p className='text-slate-600 text-sm leading-relaxed'>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
