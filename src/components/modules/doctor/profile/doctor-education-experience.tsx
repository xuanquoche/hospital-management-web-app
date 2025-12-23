import { Card } from '@/components/ui/card';
import { DoctorProfileData } from '@/hooks/use-me';

interface DoctorEducationExperienceProps {
  profile: DoctorProfileData;
}

export default function DoctorEducationExperience({ profile }: DoctorEducationExperienceProps) {
  return (
    <Card className='p-6 grid md:grid-cols-2 gap-4'>
      <div>
        <h3 className='font-semibold text-lg mb-3'>Education</h3>
        <ul className='space-y-4 text-sm text-muted-foreground'>
          {/* DoctorProfileData does not have education details yet */}
          <li>Thông tin học vấn chưa được cập nhật.</li>
        </ul>
      </div>

      <div>
        <h3 className='font-semibold text-lg mb-3'>Work & Experience</h3>
        <ul className='space-y-4 text-sm text-muted-foreground'>
          <li>
            <div className='mb-1'>
              <div className='h-2 w-2 rounded-full bg-primary inline-block mr-2'></div>
              <strong className='text-slate-900'>{profile.yearsOfExperience} năm kinh nghiệm</strong>
            </div>
            Chuyên khoa: {profile.primarySpecialty?.name}
          </li>
        </ul>
      </div>
    </Card>
  );
}
