export function DoctorEducation() {
  const educationList = [
    {
      school: 'Boston Medicine Institution - MD',
      date: '25 May 1990 - 29 Jan 1992',
    },
    {
      school: 'Harvard Medical School, Boston - MBBS',
      date: '25 May 1985 - 29 Jan 1990',
    },
  ];

  return (
    <div className='bg-card p-6 rounded-2xl shadow-sm'>
      <h3 className='text-lg font-semibold mb-4'>Education Information</h3>

      <div className='relative border-l border-dotted border-gray-300 ml-3'>
        {educationList.map((edu, index) => (
          <div key={index} className='relative pl-6 pb-4 last:pb-0'>
            <span className='absolute -left-[7px] top-1 w-3 h-3 bg-blue-600 rounded-full'></span>

            <p className='font-semibold text-sm text-foreground'>
              {edu.school}
            </p>
            <p className='text-xs text-muted-foreground'>{edu.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
