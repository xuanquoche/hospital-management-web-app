import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ProfessionalInfoProps {
  info: {
    specialty: string;
    yearsOfExperience: string;
    primaryClinic: string;
    consultationTypes: string[];
    languages: string[];
    preferredSlotLength: string;
  };
}

export function ProfessionalInfo({ info }: ProfessionalInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional information</CardTitle>
        <CardDescription>Key contact and specialization details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Specialty</p>
            <p className="font-medium">{info.specialty}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Years of experience</p>
            <p className="font-medium">{info.yearsOfExperience}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Primary clinic</p>
            <p className="font-medium">{info.primaryClinic}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Consultation types</p>
            <p className="font-medium">{info.consultationTypes.join(', ')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Languages</p>
            <p className="font-medium">{info.languages.join(', ')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">Preferred slot length</p>
            <p className="font-medium">{info.preferredSlotLength}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
