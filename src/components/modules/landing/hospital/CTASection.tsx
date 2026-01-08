'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Phone, MapPin, Clock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567' },
  { icon: Mail, label: 'Email', value: 'contact@medicare.com' },
  {
    icon: MapPin,
    label: 'Location',
    value: '123 Healthcare Ave, Medical City',
  },
  { icon: Clock, label: 'Hours', value: 'Mon-Sat: 8AM - 8PM' },
];

export function CTASection() {
  return (
    <section
      id='contact'
      className='relative py-24 bg-gradient-to-br from-cyan-500 to-emerald-500 overflow-hidden'
    >
      <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]' />
      <div className='absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl' />
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl' />

      <div className='relative z-10 max-w-7xl mx-auto px-6'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              Ready to Take the First Step Towards Better Health?
            </h2>

            <p className='text-cyan-100 text-lg mb-8'>
              Schedule your appointment today and experience healthcare that
              puts you first. Our team is ready to provide the care you deserve.
            </p>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                size='lg'
                className='bg-white text-cyan-600 hover:bg-cyan-50 font-semibold shadow-lg h-12 px-8'
              >
                Book Appointment
                <ArrowRight className='w-5 h-5' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='border-white/30 text-white hover:bg-white/10 h-12 px-8'
              >
                Call Now
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='grid grid-cols-2 gap-4'
          >
            {contactInfo.map((info, index) => (
              <div
                key={info.label}
                className='bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 hover:bg-white/20 transition-colors duration-300 cursor-pointer'
              >
                <div className='w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3'>
                  <info.icon className='w-5 h-5 text-white' />
                </div>
                <p className='text-cyan-100 text-sm mb-1'>{info.label}</p>
                <p className='text-white font-medium text-sm'>{info.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
