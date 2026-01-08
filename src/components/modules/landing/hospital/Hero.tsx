'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  Stethoscope,
  Calendar,
  Activity,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-white pt-24'>
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-1/4 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-1/4 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl' />
      </div>

      <div className='absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:64px_64px] opacity-30' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-20'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-center lg:text-left'
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-200 mb-6'
            >
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
                <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500' />
              </span>
              <span className='text-cyan-700 text-sm font-medium'>
                24/7 Emergency Services Available
              </span>
            </motion.div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6'>
              Your Health is Our{' '}
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500'>
                Top Priority
              </span>
            </h1>

            <p className='text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0'>
              Experience world-class healthcare with our team of expert doctors
              and state-of-the-art facilities. Your journey to better health
              starts here.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12'>
              <Button
                size='lg'
                className='bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-cyan-500/25 h-12 px-8'
              >
                Book Appointment
                <ArrowRight className='w-5 h-5' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-cyan-300 h-12 px-8'
              >
                View Services
              </Button>
            </div>

            <div className='flex items-center justify-center lg:justify-start gap-8'>
              <div className='flex items-center gap-2'>
                <Shield className='w-5 h-5 text-emerald-500' />
                <span className='text-slate-600 text-sm'>
                  Certified Doctors
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Clock className='w-5 h-5 text-cyan-500' />
                <span className='text-slate-600 text-sm'>24/7 Support</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className='relative'
          >
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-cyan-200/30 to-emerald-200/30 rounded-3xl blur-2xl' />

              <div className='relative bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-xl'>
                <div className='flex items-center justify-between mb-6'>
                  <div>
                    <p className='text-slate-500 text-sm'>Patient Dashboard</p>
                    <p className='text-2xl font-bold text-slate-800'>
                      Welcome Back!
                    </p>
                  </div>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center'>
                    <Users className='w-6 h-6 text-cyan-600' />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4 mb-6'>
                  <div className='bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-2xl p-4 border border-cyan-100'>
                    <Calendar className='w-8 h-8 text-cyan-600 mb-2' />
                    <p className='text-slate-600 text-xs mb-1'>
                      Next Appointment
                    </p>
                    <p className='text-slate-800 font-semibold'>
                      Jan 15, 10:00 AM
                    </p>
                  </div>
                  <div className='bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-4 border border-emerald-100'>
                    <Activity className='w-8 h-8 text-emerald-600 mb-2' />
                    <p className='text-slate-600 text-xs mb-1'>Health Score</p>
                    <p className='text-slate-800 font-semibold'>92/100</p>
                  </div>
                </div>

                <div className='bg-slate-50 rounded-2xl p-4 border border-slate-100'>
                  <p className='text-slate-600 text-sm mb-3'>Recent Activity</p>
                  <div className='space-y-3'>
                    {[
                      {
                        icon: Stethoscope,
                        text: 'General Checkup',
                        time: '2 days ago',
                        color: 'cyan',
                      },
                      {
                        icon: Activity,
                        text: 'Lab Results Ready',
                        time: '5 days ago',
                        color: 'emerald',
                      },
                    ].map((item, i) => (
                      <div key={i} className='flex items-center gap-3'>
                        <div
                          className={`w-8 h-8 rounded-lg bg-${item.color}-100 flex items-center justify-center`}
                        >
                          <item.icon
                            className={`w-4 h-4 text-${item.color}-600`}
                          />
                        </div>
                        <div className='flex-1'>
                          <p className='text-slate-700 text-sm font-medium'>
                            {item.text}
                          </p>
                          <p className='text-slate-400 text-xs'>{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className='absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-lg'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center'>
                    <Shield className='w-5 h-5 text-emerald-600' />
                  </div>
                  <div>
                    <p className='text-slate-800 font-medium text-sm'>
                      Verified
                    </p>
                    <p className='text-slate-500 text-xs'>HIPAA Compliant</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className='absolute -top-4 -right-4 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-lg'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center'>
                    <Users className='w-5 h-5 text-cyan-600' />
                  </div>
                  <div>
                    <p className='text-slate-800 font-medium text-sm'>
                      50+ Doctors
                    </p>
                    <p className='text-slate-500 text-xs'>Expert Specialists</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
