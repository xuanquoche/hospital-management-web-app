'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Stethoscope,
  CalendarCheck,
  DollarSign,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import React from 'react';

import { DashboardStats } from '@/types/admin-dashboard';

interface StatisticsCardsProps {
  stats: DashboardStats;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  bgGradient: string;
  iconBg: string;
  delay: number;
}

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendUp,
  bgGradient,
  iconBg,
  delay,
}: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`relative overflow-hidden rounded-2xl p-6 ${bgGradient}`}
  >
    <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10' />
    <div className='absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5' />

    <div className='relative z-10'>
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm font-medium text-white/80'>{title}</p>
          <p className='mt-2 text-3xl font-bold text-white'>{value}</p>
          {trend && (
            <div className='mt-2 flex items-center gap-1'>
              <TrendingUp
                className={`h-3 w-3 ${trendUp ? 'text-emerald-300' : 'text-rose-300 rotate-180'}`}
              />
              <span
                className={`text-xs font-medium ${trendUp ? 'text-emerald-300' : 'text-rose-300'}`}
              >
                {trend}
              </span>
            </div>
          )}
        </div>
        <div className={`rounded-xl p-3 ${iconBg}`}>{icon}</div>
      </div>
    </div>
  </motion.div>
);

export const StatisticsCards = ({ stats }: StatisticsCardsProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <StatCard
        title='Tổng bệnh nhân'
        value={stats.totalPatients.toLocaleString()}
        icon={<Users className='h-6 w-6 text-white' />}
        trend='+12% tháng này'
        trendUp={true}
        bgGradient='bg-gradient-to-br from-violet-500 to-purple-600'
        iconBg='bg-white/20'
        delay={0}
      />
      <StatCard
        title='Tổng bác sĩ'
        value={stats.totalDoctors.toLocaleString()}
        icon={<Stethoscope className='h-6 w-6 text-white' />}
        trend='+3 mới'
        trendUp={true}
        bgGradient='bg-gradient-to-br from-cyan-500 to-blue-600'
        iconBg='bg-white/20'
        delay={0.1}
      />
      <StatCard
        title='Lịch hẹn hôm nay'
        value={stats.todayAppointments}
        icon={<Calendar className='h-6 w-6 text-white' />}
        bgGradient='bg-gradient-to-br from-amber-500 to-orange-600'
        iconBg='bg-white/20'
        delay={0.2}
      />
      <StatCard
        title='Doanh thu'
        value={`${formatCurrency(stats.totalRevenue)} VNĐ`}
        icon={<DollarSign className='h-6 w-6 text-white' />}
        trend='+8% tháng này'
        trendUp={true}
        bgGradient='bg-gradient-to-br from-emerald-500 to-teal-600'
        iconBg='bg-white/20'
        delay={0.3}
      />
    </div>
  );
};

export const AppointmentStatusCards = ({ stats }: StatisticsCardsProps) => {
  const statusCards = [
    {
      title: 'Chờ xác nhận',
      value: stats.pendingAppointments,
      icon: <Clock className='h-5 w-5 text-amber-600' />,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
    },
    {
      title: 'Đã xác nhận',
      value: stats.confirmedAppointments,
      icon: <CalendarCheck className='h-5 w-5 text-blue-600' />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Hoàn thành',
      value: stats.completedAppointments,
      icon: <CheckCircle2 className='h-5 w-5 text-emerald-600' />,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
    },
    {
      title: 'Tổng lịch hẹn',
      value: stats.totalAppointments,
      icon: <CalendarCheck className='h-5 w-5 text-slate-600' />,
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-700',
      borderColor: 'border-slate-200',
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
      {statusCards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
          className={`rounded-xl border ${card.borderColor} ${card.bgColor} p-4`}
        >
          <div className='flex items-center gap-3'>
            <div className='rounded-lg bg-white p-2 shadow-sm'>{card.icon}</div>
            <div>
              <p className='text-xs font-medium text-slate-500'>{card.title}</p>
              <p className={`text-xl font-bold ${card.textColor}`}>
                {card.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
