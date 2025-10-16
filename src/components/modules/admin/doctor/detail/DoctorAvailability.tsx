import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function DoctorAvailability() {
  return (
    <div className='bg-card p-6 rounded-2xl shadow-sm'>
      <h3 className='text-lg font-semibold mb-4'>Availability</h3>
      <Tabs defaultValue='monday'>
        <TabsList className='flex gap-2 overflow-x-auto'>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
            (day) => (
              <TabsTrigger key={day} value={day.toLowerCase()}>
                {day}
              </TabsTrigger>
            )
          )}
        </TabsList>

        <TabsContent value='monday' className='mt-4'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {[
              '11:30 AM - 12:30 PM',
              '12:30 PM - 01:30 PM',
              '02:30 PM - 03:30 PM',
              '04:30 PM - 05:30 PM',
              '06:00 PM - 07:30 PM',
              '09:00 PM - 11:00 PM',
            ].map((t) => (
              <div
                key={t}
                className='text-sm bg-muted rounded-md p-2 text-center'
              >
                {t}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
