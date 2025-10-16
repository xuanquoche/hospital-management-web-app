export function DoctorAwards() {
  return (
    <div className='bg-card p-6 rounded-2xl shadow-sm'>
      <h3 className='text-lg font-semibold mb-3'>Awards & Recognition</h3>
      <ul className='list-disc pl-6 text-sm text-muted-foreground space-y-1'>
        <li>
          <span className='font-medium text-foreground'>
            Top Doctor Award (2023)
          </span>{' '}
          – Recognized by U.S. News & World Report.
        </li>
        <li>
          <span className='font-medium text-foreground'>
            Patient Choice Award (2022)
          </span>{' '}
          – Awarded by Vitalis.com for high patient ratings.
        </li>
      </ul>
    </div>
  );
}
