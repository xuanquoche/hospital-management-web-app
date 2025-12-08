import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfessionalInfo } from './ProfessionalInfo';
import { WeeklySchedule } from './WeeklySchedule';

interface DoctorDetailTabsProps {
  professionalInfo: React.ComponentProps<typeof ProfessionalInfo>['info'];
  schedule: React.ComponentProps<typeof WeeklySchedule>['schedule'];
  dateRange: string;
}

export function DoctorDetailTabs({ professionalInfo, schedule, dateRange }: DoctorDetailTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="bg-transparent p-0 gap-6 border-b w-full justify-start rounded-none h-auto">
        <TabsTrigger
          value="overview"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="schedule"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2"
        >
          Schedule
        </TabsTrigger>
        <TabsTrigger
          value="appointments"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2"
        >
          Appointments
        </TabsTrigger>
        <TabsTrigger
          value="documents"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-600 data-[state=active]:text-emerald-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-2"
        >
          Documents
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-6 space-y-6">
        <ProfessionalInfo info={professionalInfo} />
        <WeeklySchedule schedule={schedule} dateRange={dateRange} />
      </TabsContent>
      <TabsContent value="schedule" className="mt-6">
        <div className="text-muted-foreground text-sm">Schedule content placeholder</div>
      </TabsContent>
      <TabsContent value="appointments" className="mt-6">
        <div className="text-muted-foreground text-sm">Appointments content placeholder</div>
      </TabsContent>
      <TabsContent value="documents" className="mt-6">
        <div className="text-muted-foreground text-sm">Documents content placeholder</div>
      </TabsContent>
    </Tabs>
  );
}
