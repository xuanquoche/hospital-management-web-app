import { Card } from '@/components/ui/card';

export default function DoctorEducationExperience() {
  return (
    <Card className='p-6 grid md:grid-cols-2 gap-4'>
      <div>
        <h3 className='font-semibold text-lg mb-3'>Education</h3>
        <ul className='space-y-2 text-sm text-muted-foreground'>
          <li>
            <div className='mb-2'>
              <div className='h-2 w-2 rounded-full bg-primary inline-block mr-2'></div>
              <strong>
                Chattagram International Dental College & Hospital
              </strong>
            </div>
            MDS - Periodontology and Oral Implantology, BDS 1998 - 2003
          </li>
          <li>
            <div className='mb-2'>
              <div className='h-2 w-2 rounded-full bg-primary inline-block mr-2'></div>
              <strong>US Dental Medical University</strong>
            </div>
            Oral And Maxillofacial Surgeon, Dentist 2003 - 2005
          </li>
        </ul>
      </div>

      <div>
        <h3 className='font-semibold text-lg mb-3'>Work & Experience</h3>
        <ul className='space-y-2 text-sm text-muted-foreground'>
          <li>
            <div className='mb-2'>
              <div className='h-2 w-2 rounded-full bg-primary inline-block mr-2'></div>
              <strong>Ibn Sina Specialized Hospital</strong>
            </div>
            2010 - Present (5 years)
          </li>
          <li>
            <div className='mb-2'>
              <div className='h-2 w-2 rounded-full bg-primary inline-block mr-2'></div>
              <strong>Dhaka Dental College and Hospital</strong>
            </div>
            2007 - 2010 (3 years)
          </li>
          <li>
            <div className='mb-2'>
              <div className='h-2 w-2 rounded-full bg-primary inline-block mr-2'></div>
              <strong>Smile Dental Care</strong>
            </div>
            2005 - 2007 (3 years)
          </li>
        </ul>
      </div>
    </Card>
  );
}
