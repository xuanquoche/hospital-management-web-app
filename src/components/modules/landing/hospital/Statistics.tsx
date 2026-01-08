'use client';

import { motion } from 'framer-motion';
import { Users, Stethoscope, Award, Clock } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const stats = [
  {
    value: 50000,
    suffix: '+',
    label: 'Happy Patients',
    icon: Users,
    color: 'cyan',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Expert Doctors',
    icon: Stethoscope,
    color: 'emerald',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    icon: Award,
    color: 'amber',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Emergency Care',
    icon: Clock,
    color: 'rose',
  },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const colorVariants: Record<string, { bg: string; icon: string }> = {
  cyan: { bg: 'bg-cyan-100', icon: 'text-cyan-600' },
  emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600' },
  amber: { bg: 'bg-amber-100', icon: 'text-amber-600' },
  rose: { bg: 'bg-rose-100', icon: 'text-rose-600' },
};

export function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className='relative py-24 bg-gradient-to-b from-cyan-50 to-white'
    >
      <div className='absolute top-0 left-1/3 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl' />
      <div className='absolute bottom-0 right-1/3 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl' />

      <div className='relative z-10 max-w-7xl mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-4'>
            Trusted by{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500'>
              Thousands
            </span>
          </h2>
          <p className='text-slate-600 text-lg max-w-2xl mx-auto'>
            Our commitment to excellence has earned the trust of patients across
            the region
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => {
            const colors = colorVariants[stat.color];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='text-center bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all duration-300 cursor-pointer'
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${colors.bg} mb-4`}
                >
                  <stat.icon className={`w-7 h-7 ${colors.icon}`} />
                </div>
                <p className='text-4xl md:text-5xl font-bold text-slate-800 mb-2'>
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </p>
                <p className='text-slate-600'>{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
