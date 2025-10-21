import { Card } from '@/components/ui/card';

const services = [
  'Tooth cleaning',
  'Root Canal Therapy',
  'Implants',
  'Surgical Extractions',
  'Fissure Sealants',
  'Composite Bonding',
  'Orthodontics',
  'Tooth extractions',
  'Wisdom tooth removal',
];

export default function DoctorServices() {
  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg mb-3'>Services</h3>
      <div className='flex flex-wrap gap-2'>
        {services.map((service) => (
          <span
            key={service}
            className='text-sm bg-gray-100 rounded-full px-3 py-1 text-muted-foreground'
          >
            {service}
          </span>
        ))}
      </div>
    </Card>
  );
}
