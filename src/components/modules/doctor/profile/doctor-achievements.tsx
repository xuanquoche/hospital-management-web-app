import { Card } from '@/components/ui/card';
import { DoctorProfileData } from '@/hooks/use-me';

interface DoctorAchievementsProps {
  profile: DoctorProfileData;
}

export default function DoctorAchievements({ profile }: DoctorAchievementsProps) {
  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg mb-3'>Achievements</h3>
      <div className='grid md:grid-cols-2 gap-4 text-sm text-muted-foreground'>
        {/* DoctorProfileData does not have awards yet */}
        <div>Chưa có thông tin thành tựu.</div>
      </div>
    </Card>
  );
}
