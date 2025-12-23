import { Card } from '@/components/ui/card';
import { DoctorProfileData } from '@/hooks/use-me';

interface DoctorBiographyProps {
  profile: DoctorProfileData;
}

export default function DoctorBiography({ profile }: DoctorBiographyProps) {
  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg'>Biography</h3>
      <p className='text-sm text-muted-foreground mt-2'>{profile.bio || 'Chưa có thông tin tiểu sử.'}</p>
    </Card>
  );
}
