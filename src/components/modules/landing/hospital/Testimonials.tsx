'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Patient',
    avatar: 'SJ',
    content:
      'The doctors here are incredibly caring and professional. My surgery went smoothly and the aftercare was exceptional. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Patient',
    avatar: 'MC',
    content:
      'From the moment I walked in, I felt welcomed. The staff is friendly, the facilities are modern, and my treatment was top-notch.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Patient',
    avatar: 'ED',
    content:
      "I've been bringing my family here for years. The pediatric department is amazing with kids, and the doctors always take time to explain everything.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className='relative py-24 bg-white'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:64px_64px] opacity-30' />

      <div className='relative z-10 max-w-7xl mx-auto px-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <span className='inline-block px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium mb-4'>
            Testimonials
          </span>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-800 mb-4'>
            What Our{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500'>
              Patients Say
            </span>
          </h2>
          <p className='text-slate-600 text-lg max-w-2xl mx-auto'>
            Real stories from real patients about their experience with us
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative group cursor-pointer'
            >
              <div className='relative h-full bg-white border border-slate-200 rounded-2xl p-6 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300'>
                <div className='flex items-center gap-1 mb-4'>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className='w-4 h-4 fill-amber-400 text-amber-400'
                    />
                  ))}
                </div>

                <div className='relative mb-6'>
                  <Quote className='absolute -top-2 -left-2 w-8 h-8 text-cyan-200' />
                  <p className='text-slate-600 leading-relaxed pl-4'>
                    {testimonial.content}
                  </p>
                </div>

                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-white font-semibold'>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className='text-slate-800 font-medium'>
                      {testimonial.name}
                    </p>
                    <p className='text-slate-500 text-sm'>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
