import { useCallback, useEffect, useState } from 'react';

import { clientFetcher } from '@/lib/fetcher';
import {
  AdminAppointment,
  AdminAppointmentsResponse,
  AdminDoctor,
  AdminDoctorsResponse,
  AdminPatientsResponse,
  AdminPayment,
  AdminPaymentsResponse,
  DashboardStats,
  WeeklyDataItem,
} from '@/types/admin-dashboard';

export interface AdminDashboardData {
  stats: DashboardStats;
  recentAppointments: AdminAppointment[];
  recentDoctors: AdminDoctor[];
  recentPayments: AdminPayment[];
}

const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    startDate: monday.toISOString().split('T')[0],
    endDate: sunday.toISOString().split('T')[0],
    monday,
  };
};

const getDayLabel = (dayIndex: number): string => {
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return days[dayIndex];
};

const initialWeeklyData: WeeklyDataItem[] = [
  { day: 'T2', date: '', appointments: 0, revenue: 0 },
  { day: 'T3', date: '', appointments: 0, revenue: 0 },
  { day: 'T4', date: '', appointments: 0, revenue: 0 },
  { day: 'T5', date: '', appointments: 0, revenue: 0 },
  { day: 'T6', date: '', appointments: 0, revenue: 0 },
  { day: 'T7', date: '', appointments: 0, revenue: 0 },
  { day: 'CN', date: '', appointments: 0, revenue: 0 },
];

const initialStats: DashboardStats = {
  totalPatients: 0,
  totalDoctors: 0,
  totalAppointments: 0,
  pendingAppointments: 0,
  confirmedAppointments: 0,
  completedAppointments: 0,
  totalRevenue: 0,
  todayAppointments: 0,
  weeklyData: initialWeeklyData,
  weeklyTotalAppointments: 0,
  weeklyTotalRevenue: 0,
};

export const useAdminDashboard = () => {
  const [data, setData] = useState<AdminDashboardData>({
    stats: initialStats,
    recentAppointments: [],
    recentDoctors: [],
    recentPayments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date().toISOString().split('T')[0];
      const { startDate, endDate, monday } = getWeekDates();

      const [appointmentsRes, doctorsRes, patientsRes, paymentsRes] =
        await Promise.all([
          clientFetcher.get<AdminAppointmentsResponse>(
            '/admin/appointments?limit=100&sortBy=createdAt&sortOrder=desc'
          ),
          clientFetcher.get<AdminDoctorsResponse>('/admin/doctors?limit=10'),
          clientFetcher.get<AdminPatientsResponse>('/admin/patients?limit=1'),
          clientFetcher.get<AdminPaymentsResponse>(
            '/admin/payments?limit=50&sortBy=createdAt&sortOrder=desc'
          ),
        ]);

      const allAppointments = appointmentsRes.success
        ? appointmentsRes.data
        : [];
      const totalAppointments = appointmentsRes.success
        ? appointmentsRes.meta.totalItems
        : 0;

      const pendingCount = allAppointments.filter(
        (a) => a.status === 'PENDING'
      ).length;
      const confirmedCount = allAppointments.filter(
        (a) => a.status === 'CONFIRMED'
      ).length;
      const completedCount = allAppointments.filter(
        (a) => a.status === 'COMPLETED'
      ).length;

      const todayAppts = allAppointments.filter(
        (a) => a.appointmentDate === today
      ).length;

      const weeklyAppointments = allAppointments.filter((a) => {
        const aptDate = a.appointmentDate;
        return aptDate >= startDate && aptDate <= endDate;
      });

      const payments = paymentsRes.success ? paymentsRes.data : [];
      const totalRevenue = payments.reduce((sum, p) => {
        if (p.status === 'SUCCESS') {
          return sum + (p.amount || 0);
        }
        return sum;
      }, 0);

      const weeklyDataMap = new Map<
        string,
        { appointments: number; revenue: number }
      >();

      for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        weeklyDataMap.set(dateStr, { appointments: 0, revenue: 0 });
      }

      weeklyAppointments.forEach((apt) => {
        const dateStr = apt.appointmentDate;
        const existing = weeklyDataMap.get(dateStr);
        if (existing) {
          existing.appointments += 1;
        }
      });

      payments.forEach((payment) => {
        if (payment.status === 'SUCCESS' && payment.createdAt) {
          const paymentDate = payment.createdAt.split('T')[0];
          const existing = weeklyDataMap.get(paymentDate);
          if (existing) {
            existing.revenue += payment.amount || 0;
          }
        }
      });

      const weeklyData: WeeklyDataItem[] = [];
      let weeklyTotalAppointments = 0;
      let weeklyTotalRevenue = 0;

      for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const dayIndex = date.getDay();
        const dayData = weeklyDataMap.get(dateStr) || {
          appointments: 0,
          revenue: 0,
        };

        weeklyData.push({
          day: getDayLabel(dayIndex),
          date: dateStr,
          appointments: dayData.appointments,
          revenue: dayData.revenue,
        });

        weeklyTotalAppointments += dayData.appointments;
        weeklyTotalRevenue += dayData.revenue;
      }

      const doctors = doctorsRes.success ? doctorsRes.data : [];

      setData({
        stats: {
          totalPatients: patientsRes.success ? patientsRes.meta.totalItems : 0,
          totalDoctors: doctorsRes.success ? doctorsRes.meta.totalItems : 0,
          totalAppointments,
          pendingAppointments: pendingCount,
          confirmedAppointments: confirmedCount,
          completedAppointments: completedCount,
          totalRevenue,
          todayAppointments: todayAppts,
          weeklyData,
          weeklyTotalAppointments,
          weeklyTotalRevenue,
        },
        recentAppointments: allAppointments.slice(0, 5),
        recentDoctors: doctors.slice(0, 5),
        recentPayments: payments.slice(0, 5),
      });
    } catch (err) {
      console.error('Error fetching admin dashboard:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    ...data,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};
