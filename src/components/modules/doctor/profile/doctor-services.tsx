import { Card } from '@/components/ui/card';
import { DoctorProfileData } from '@/hooks/use-me';

interface DoctorServicesProps {
  profile: DoctorProfileData;
}

export default function DoctorServices({ profile }: DoctorServicesProps) {
  // Note: If doctor has specific services in the future, map them here.
  // For now, we can use subSpecialty if it's available.
  const services = profile.subSpecialty
    ? profile.subSpecialty.split(',').map((s) => s.trim())
    : [
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

  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg mb-3'>Services</h3>
      <div className='flex flex-wrap gap-2'>
        {services.map((service) => (
          <span key={service} className='text-sm bg-gray-100 rounded-full px-3 py-1 text-muted-foreground'>
            {service}
          </span>
        ))}
      </div>
    </Card>
  );
}
