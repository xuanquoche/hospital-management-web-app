import { Card } from '@/components/ui/card';

export default function DoctorAchievements() {
  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg mb-3'>Achievements</h3>
      <div className='grid md:grid-cols-2 gap-4 text-sm text-muted-foreground'>
        <div className='mb-2'>
          <div className='h-2 w-2 rounded-full bg-primary inline-block mr-2'></div>
          <strong>Best Dentist Award 2021</strong> <br />
          July 2019 <br />
          Dr. Friedman and his team are the proud recipients of the New Jersey
          Top Dentist award for 2019. We are proud to be selected for this honor
          by our wonderful patients.
        </div>
        <div className='mb-2'>
          <div className='h-2 w-2 rounded-full bg-primary inline-block mr-2'></div>
          <strong>Best Dentist Award 2021</strong> <br />
          <strong>The Dental Professional of The Year Award</strong> <br />
          May 2010 <br />
          Nicole Elango and Deeon Trute are finalists for the Student Dentist of
          the year.
        </div>
      </div>
    </Card>
  );
}
