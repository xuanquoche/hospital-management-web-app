import { Card } from '@/components/ui/card';

const specializations = [
  'Dental Care',
  'Children Care',
  'Oral and Maxillofacial Surgery',
  'Orthodontics',
  'Prosthodontics',
  'Periodontist',
  'Pediatric Dentistry',
];

export default function DoctorSpecializations() {
  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg mb-3'>Specializations</h3>
      <div className='flex flex-wrap gap-2'>
        {specializations.map((item) => (
          <span
            key={item}
            className='text-sm bg-gray-100 rounded-full px-3 py-1 text-muted-foreground'
          >
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}
