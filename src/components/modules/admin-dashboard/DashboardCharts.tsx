'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import React, { useMemo } from 'react';

import { DashboardStats } from '@/types/admin-dashboard';

interface DashboardChartsProps {
  stats: DashboardStats;
}

const formatCurrency = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

export const AppointmentChart = ({ stats }: DashboardChartsProps) => {
  const { weeklyData, weeklyTotalAppointments } = stats;

  const maxAppointments = useMemo(() => {
    const max = Math.max(...weeklyData.map((d) => d.appointments));
    return max > 0 ? max : 1;
  }, [weeklyData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-start justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            Lịch hẹn tuần này
          </h3>
          <p className='text-sm text-slate-500'>Số lượng lịch hẹn theo ngày</p>
        </div>
        {weeklyTotalAppointments > 0 && (
          <div className='flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1'>
            <ArrowUpRight className='h-4 w-4 text-emerald-600' />
            <span className='text-sm font-semibold text-emerald-600'>
              {weeklyTotalAppointments}
            </span>
          </div>
        )}
      </div>

      <div className='flex h-48 items-end justify-between gap-2'>
        {weeklyData.map((data, index) => {
          const height =
            data.appointments > 0
              ? (data.appointments / maxAppointments) * 100
              : 0;
          return (
            <div
              key={data.day}
              className='group flex flex-1 flex-col items-center gap-2'
            >
              <div className='relative flex h-full w-full items-end justify-center'>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: height > 0 ? `${height}%` : '4px' }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`relative w-full max-w-[40px] rounded-t-lg ${
                    height > 0
                      ? 'bg-gradient-to-t from-violet-500 to-violet-400 shadow-lg shadow-violet-200'
                      : 'bg-slate-200'
                  }`}
                >
                  {data.appointments > 0 && (
                    <div className='absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100'>
                      {data.appointments}
                    </div>
                  )}
                </motion.div>
              </div>
              <div className='text-center'>
                <span className='block text-xs font-semibold text-slate-700'>
                  {data.appointments}
                </span>
                <span className='text-xs font-medium text-slate-500'>
                  {data.day}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className='mt-6 flex items-center justify-between border-t border-slate-100 pt-4'>
        <div className='flex items-center gap-2'>
          <div className='h-3 w-3 rounded-full bg-violet-500' />
          <span className='text-sm text-slate-600'>Lịch hẹn</span>
        </div>
        <div className='text-right'>
          <p className='text-2xl font-bold text-slate-900'>
            {weeklyTotalAppointments}
          </p>
          <p className='text-xs text-slate-500'>Tổng tuần này</p>
        </div>
      </div>
    </motion.div>
  );
};

export const RevenueChart = ({ stats }: DashboardChartsProps) => {
  const { weeklyData, weeklyTotalRevenue } = stats;

  const maxRevenue = useMemo(() => {
    const max = Math.max(...weeklyData.map((d) => d.revenue));
    return max > 0 ? max : 1;
  }, [weeklyData]);

  const pathData = useMemo(() => {
    if (weeklyData.every((d) => d.revenue === 0)) {
      return 'M0,140 L300,140';
    }

    const points = weeklyData.map((d, i) => {
      const x = (i / (weeklyData.length - 1)) * 300;
      const y = 140 - (d.revenue / maxRevenue) * 120;
      return { x, y };
    });

    let path = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx1 = prev.x + (curr.x - prev.x) / 3;
      const cpx2 = prev.x + ((curr.x - prev.x) * 2) / 3;
      path += ` C${cpx1},${prev.y} ${cpx2},${curr.y} ${curr.x},${curr.y}`;
    }
    return path;
  }, [weeklyData, maxRevenue]);

  const areaPath = useMemo(() => {
    return `${pathData} L300,150 L0,150 Z`;
  }, [pathData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
    >
      <div className='mb-6 flex items-start justify-between'>
        <div>
          <h3 className='text-lg font-bold text-slate-900'>
            Doanh thu tuần này
          </h3>
          <p className='text-sm text-slate-500'>Theo dõi doanh thu hàng ngày</p>
        </div>
        {weeklyTotalRevenue > 0 && (
          <div className='flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1'>
            <ArrowUpRight className='h-4 w-4 text-emerald-600' />
            <span className='text-sm font-semibold text-emerald-600'>
              {formatCurrency(weeklyTotalRevenue)}
            </span>
          </div>
        )}
      </div>

      <div className='relative h-48'>
        <svg
          className='h-full w-full'
          viewBox='0 0 300 150'
          preserveAspectRatio='none'
        >
          <defs>
            <linearGradient
              id='revenueGradient'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#10b981' stopOpacity='0.3' />
              <stop offset='100%' stopColor='#10b981' stopOpacity='0' />
            </linearGradient>
          </defs>
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            d={pathData}
            fill='none'
            stroke='#10b981'
            strokeWidth='3'
            strokeLinecap='round'
          />
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            d={areaPath}
            fill='url(#revenueGradient)'
          />
        </svg>

        <div className='absolute bottom-0 left-0 right-0 flex justify-between px-2'>
          {weeklyData.map((data) => (
            <span key={data.day} className='text-xs font-medium text-slate-500'>
              {data.day}
            </span>
          ))}
        </div>
      </div>

      <div className='mt-6 flex items-center justify-between border-t border-slate-100 pt-4'>
        <div className='flex items-center gap-2'>
          <div className='h-3 w-3 rounded-full bg-emerald-500' />
          <span className='text-sm text-slate-600'>Doanh thu</span>
        </div>
        <div className='text-right'>
          <p className='text-2xl font-bold text-slate-900'>
            {formatCurrency(weeklyTotalRevenue)}
          </p>
          <p className='text-xs text-slate-500'>VNĐ tuần này</p>
        </div>
      </div>
    </motion.div>
  );
};

export const AppointmentStatusPieChart = ({ stats }: DashboardChartsProps) => {
  const total =
    stats.pendingAppointments +
    stats.confirmedAppointments +
    stats.completedAppointments;
  const pendingPercent =
    total > 0 ? (stats.pendingAppointments / total) * 100 : 0;
  const confirmedPercent =
    total > 0 ? (stats.confirmedAppointments / total) * 100 : 0;
  const completedPercent =
    total > 0 ? (stats.completedAppointments / total) * 100 : 0;

  const segments = [
    {
      percent: completedPercent,
      color: '#10b981',
      label: 'Hoàn thành',
      value: stats.completedAppointments,
    },
    {
      percent: confirmedPercent,
      color: '#3b82f6',
      label: 'Đã xác nhận',
      value: stats.confirmedAppointments,
    },
    {
      percent: pendingPercent,
      color: '#f59e0b',
      label: 'Chờ xử lý',
      value: stats.pendingAppointments,
    },
  ];

  let cumulativePercent = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
    >
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-900'>Phân bố trạng thái</h3>
        <p className='text-sm text-slate-500'>Tỷ lệ các trạng thái lịch hẹn</p>
      </div>

      <div className='flex items-center justify-center gap-8'>
        <div className='relative h-40 w-40'>
          <svg viewBox='0 0 100 100' className='h-full w-full -rotate-90'>
            {segments.map((segment, index) => {
              const strokeDasharray = `${segment.percent} ${100 - segment.percent}`;
              const strokeDashoffset = -cumulativePercent;
              cumulativePercent += segment.percent;

              return (
                <motion.circle
                  key={segment.label}
                  initial={{ strokeDasharray: '0 100' }}
                  animate={{ strokeDasharray }}
                  transition={{ duration: 1, delay: 0.7 + index * 0.2 }}
                  cx='50'
                  cy='50'
                  r='40'
                  fill='none'
                  stroke={segment.color}
                  strokeWidth='20'
                  strokeDashoffset={strokeDashoffset}
                  pathLength='100'
                />
              );
            })}
          </svg>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-3xl font-bold text-slate-900'>{total}</span>
            <span className='text-xs text-slate-500'>Tổng</span>
          </div>
        </div>

        <div className='space-y-3'>
          {segments.map((segment) => (
            <div key={segment.label} className='flex items-center gap-3'>
              <div
                className='h-3 w-3 rounded-full'
                style={{ backgroundColor: segment.color }}
              />
              <div>
                <p className='text-sm font-medium text-slate-700'>
                  {segment.label}
                </p>
                <p className='text-xs text-slate-500'>
                  {segment.value} ({segment.percent.toFixed(0)}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const DashboardCharts = ({ stats }: DashboardChartsProps) => {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
      <AppointmentChart stats={stats} />
      <RevenueChart stats={stats} />
      <AppointmentStatusPieChart stats={stats} />
    </div>
  );
};
