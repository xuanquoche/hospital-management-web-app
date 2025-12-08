import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download, Columns } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: 'In-person' | 'Telehealth';
  patient: {
    name: string;
    phone: string;
    avatarUrl?: string;
  };
  doctor: {
    name: string;
    specialty: string;
    avatarUrl?: string;
  };
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdFrom: 'Desk' | 'Web';
}

interface AppointmentTableProps {
  appointments: Appointment[];
}

export function AppointmentTable({ appointments }: AppointmentTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Appointment List • Showing 1–6 of 128
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Columns className="mr-2 size-4" />
            Columns
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader className="bg-emerald-50/50">
            <TableRow>
              <TableHead>Date & time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created from</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{appointment.date} · {appointment.time}</span>
                    <span className="text-muted-foreground text-xs">
                      {appointment.type === 'In-person' ? `${appointment.duration} · ${appointment.location}` : appointment.type}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={appointment.patient.avatarUrl} alt={appointment.patient.name} />
                      <AvatarFallback>{appointment.patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{appointment.patient.name}</span>
                      <span className="text-muted-foreground text-xs">{appointment.patient.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={appointment.doctor.avatarUrl} alt={appointment.doctor.name} />
                      <AvatarFallback>{appointment.doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{appointment.doctor.name}</span>
                      <span className="text-muted-foreground text-xs">{appointment.doctor.specialty}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full font-normal",
                      appointment.status === 'Confirmed' && "bg-emerald-600 text-white hover:bg-emerald-700",
                      appointment.status === 'Pending' && "bg-amber-500 text-white hover:bg-amber-600",
                      appointment.status === 'Completed' && "bg-slate-100 text-slate-500 hover:bg-slate-200",
                      appointment.status === 'Cancelled' && "bg-red-500 text-white hover:bg-red-600"
                    )}
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{appointment.createdFrom}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 text-xs font-medium text-emerald-600">
                    <button className="hover:underline">View</button>
                    <span className="text-muted-foreground">•</span>
                    <button className="hover:underline">Reschedule</button>
                    <span className="text-muted-foreground">•</span>
                    <button className="hover:underline">Cancel</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-muted-foreground text-sm">
          Showing 1–6 of 128 appointments
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" disabled>
            <ChevronLeft className="size-4" />
          </Button>
          <div className="text-sm font-medium">Page 1 of 22</div>
          <Button variant="outline" size="icon-sm">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
