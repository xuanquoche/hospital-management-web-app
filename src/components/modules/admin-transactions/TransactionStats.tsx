import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TransactionStats() {
  return (
    <div className='space-y-6'>
      {/* Revenue Summary */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base font-semibold'>
            Tổng quan doanh thu
          </CardTitle>
          <p className='text-muted-foreground text-xs'>
            Revenue summary · 01–31 Aug 2025
          </p>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-muted-foreground text-xs'>Today</p>
              <p className='text-xl font-bold'>$1,240</p>
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>Yesterday</p>
              <p className='text-xl font-bold'>$1,080</p>
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>This month</p>
              <p className='text-xl font-bold'>$32,450</p>
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>This year</p>
              <p className='text-xl font-bold'>$284,910</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base font-semibold'>Thống kê</CardTitle>
          <p className='text-muted-foreground text-xs'>
            Doanh thu theo ngày / tháng / năm
          </p>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-2 mb-4'>
            <Badge
              variant='default'
              className='bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
            >
              Daily
            </Badge>
            <Badge
              variant='secondary'
              className='cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Monthly
            </Badge>
            <Badge
              variant='secondary'
              className='cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Yearly
            </Badge>
          </div>
          <div className='bg-emerald-50/50 rounded-lg p-4 h-32 flex items-center justify-center border border-dashed border-emerald-200'>
            <div className='text-center'>
              <p className='text-sm font-medium text-emerald-800'>
                Revenue trend
              </p>
              <p className='text-xs text-emerald-600'>Chart placeholder</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base font-semibold'>
            Payment breakdown
          </CardTitle>
          <p className='text-muted-foreground text-xs'>
            Methods and status mix
          </p>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Cash</span>
              <span className='font-medium'>48%</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Card</span>
              <span className='font-medium'>32%</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Online</span>
              <span className='font-medium'>20%</span>
            </div>
            <div className='my-2 h-px bg-border' />
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Paid</span>
              <span className='font-medium'>92%</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Pending</span>
              <span className='font-medium'>5%</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Failed / Refunded</span>
              <span className='font-medium'>3%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
