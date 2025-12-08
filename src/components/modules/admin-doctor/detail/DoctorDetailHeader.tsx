import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Calendar, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

interface DoctorDetailHeaderProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    status: 'Active' | 'Inactive';
    email: string;
    phone: string;
    location: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
    prefersMorningSlots?: boolean;
  };
}

export function DoctorDetailHeader({ doctor }: DoctorDetailHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Doctor details</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Profile, availability, and upcoming appointments for this doctor.
          </p>
          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
            <span>ID: {doctor.id}</span>
            <span>•</span>
            <span>Created {doctor.createdAt}</span>
            <span>•</span>
            <span>Last updated {doctor.updatedAt}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin-doctor">
              <ArrowLeft className="mr-2 size-4" />
              Back to list
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 size-4" />
            Edit profile
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Calendar className="mr-2 size-4" />
            Manage schedule
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 shadow-sm md:flex-row md:items-center">
        <Avatar className="size-20 md:size-24">
          <AvatarImage src={doctor.avatarUrl} alt={doctor.name} />
          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                <span>{doctor.specialty}</span>
                <span>•</span>
                <span>{doctor.experience} experience</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="text-muted-foreground text-xs">
                Today · 12 Aug 2025 • Next slot at 14:00
              </div>
              <div className="text-xs font-medium">
                Today <span className="font-bold">8 / 12 slots booked</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant={doctor.status === 'Active' ? 'default' : 'secondary'}
              className={
                doctor.status === 'Active'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : ''
              }
            >
              {doctor.status}
            </Badge>
            {doctor.prefersMorningSlots && (
              <span className="text-muted-foreground text-xs">
                Prefers morning slots
              </span>
            )}
          </div>

          <div className="text-muted-foreground mt-2 flex flex-wrap gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-1.5">
              <Mail className="size-3.5" />
              {doctor.email}
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="size-3.5" />
              {doctor.phone}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {doctor.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
