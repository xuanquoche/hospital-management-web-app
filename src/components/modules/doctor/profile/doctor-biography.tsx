import { Card } from '@/components/ui/card';

export default function DoctorBiography() {
  return (
    <Card className='p-6'>
      <h3 className='font-semibold text-lg'>Biography</h3>
      <p className='text-sm text-muted-foreground'>
        Jacob Jones, PPCNP, is a pediatric nurse practitioner who was born and
        raised in the Maryland and Washington, D.C., area. She attended Elon
        University in North Carolina, where she completed undergraduate studies
        with a B.A. in psychology and triple minor degrees in neuroscience,
        anthropology and African–American studies.
      </p>
    </Card>
  );
}
