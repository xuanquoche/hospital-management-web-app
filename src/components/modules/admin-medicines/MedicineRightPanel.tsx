import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MedicineRightPanel() {
  return (
    <div className='space-y-6'>
      {/* Quick Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base font-semibold'>
            Quick filters
          </CardTitle>
          <p className='text-muted-foreground text-xs'>
            Các chế độ xem phổ biến
          </p>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            <Badge
              variant='default'
              className='bg-emerald-600 hover:bg-emerald-700 cursor-pointer'
            >
              All medicines
            </Badge>
            <Badge
              variant='secondary'
              className='cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              In stock
            </Badge>
            <Badge
              variant='secondary'
              className='cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Low stock
            </Badge>
            <Badge
              variant='secondary'
              className='cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-200'
            >
              Expired
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Overview */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base font-semibold'>
            Inventory overview
          </CardTitle>
          <p className='text-muted-foreground text-xs'>
            Tổng quan kho hiện tại
          </p>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Total SKUs</span>
              <span className='font-medium'>124</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Total batches</span>
              <span className='font-medium'>287</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>
                Estimated stock value
              </span>
              <span className='font-medium'>$48,320</span>
            </div>
            <div className='my-2 h-px bg-border' />
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Low stock items</span>
              <span className='font-medium'>9</span>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>Expired batches</span>
              <span className='font-medium'>3</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expiry Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className='text-base font-semibold'>
            Expiry alerts
          </CardTitle>
          <p className='text-muted-foreground text-xs'>Thuốc sắp hết hạn</p>
        </CardHeader>
        <CardContent>
          <div className='space-y-2 mb-4'>
            <div className='flex items-center gap-2 text-xs'>
              <div className='size-2 rounded-full bg-red-500' />
              <span>Expired</span>
            </div>
            <div className='flex items-center gap-2 text-xs'>
              <div className='size-2 rounded-full bg-orange-500' />
              <span>&lt; 30 days</span>
            </div>
            <div className='flex items-center gap-2 text-xs'>
              <div className='size-2 rounded-full bg-emerald-500' />
              <span>30–90 days</span>
            </div>
          </div>

          <div className='space-y-3'>
            <div className='flex items-center justify-between text-xs'>
              <span className='font-medium'>Amoxicillin 500mg</span>
              <span className='text-muted-foreground'>15 Sep 2025</span>
            </div>
            <div className='flex items-center justify-between text-xs'>
              <span className='font-medium'>Cefixime 100mg</span>
              <span className='text-muted-foreground'>08 Oct 2025</span>
            </div>
            <div className='flex items-center justify-between text-xs'>
              <span className='font-medium'>Vitamin C 500mg</span>
              <span className='text-muted-foreground'>--</span>
            </div>
          </div>

          <Button
            variant='outline'
            className='w-full mt-4 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800'
          >
            View all expiry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
