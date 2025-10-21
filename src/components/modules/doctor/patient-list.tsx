import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function PatientsList({
  patients,
  onSelectPatient,
  selectedPatient,
}: {
  patients: any[];
  onSelectPatient: (p: any) => void;
  selectedPatient: any;
}) {
  return (
    <div className='bg-white rounded-xl shadow p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-xl font-semibold'>Patients List</h3>
        <div className='text-sm text-muted-foreground'>
          {patients.length} users
        </div>
      </div>

      {patients.length === 0 ? (
        <p className='text-sm text-muted-foreground text-center py-8'>
          No patients on this date.
        </p>
      ) : (
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='font-medium text-muted-foreground'>
                  Patients name
                </TableHead>
                <TableHead className='font-medium text-muted-foreground'>
                  Sex
                </TableHead>
                <TableHead className='font-medium text-muted-foreground'>
                  Age
                </TableHead>
                <TableHead className='font-medium text-muted-foreground'>
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => (
                <TableRow
                  key={p.id}
                  onClick={() => onSelectPatient(p)}
                  className={`cursor-pointer transition-colors ${
                    selectedPatient?.id === p.id
                      ? 'bg-blue-50 hover:bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <TableCell className='font-medium'>
                    <div>
                      <p>{p.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {p.username}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm capitalize'>{p.sex}</span>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>{p.age}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        p.status === 'Finished'
                          ? 'secondary'
                          : p.status === 'Waiting'
                            ? 'outline'
                            : 'destructive'
                      }
                      className={
                        p.status === 'Finished'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : p.status === 'Waiting'
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }
                    >
                      {p.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <div className='flex justify-between items-center mt-6 pt-4 border-t'>
        <div className='text-sm text-muted-foreground'>
          Showing {patients.length} of {patients.length} results
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' size='sm' disabled>
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='bg-blue-50 border-blue-200'
          >
            1
          </Button>
          <Button variant='outline' size='sm'>
            2
          </Button>
          <Button variant='outline' size='sm'>
            8
          </Button>
          <Button variant='outline' size='sm'>
            9
          </Button>
          <Button variant='outline' size='sm'>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
