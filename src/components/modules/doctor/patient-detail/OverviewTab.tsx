import { motion } from 'framer-motion';
import React from 'react';

import { PatientDetail } from './data';
import { PersonalInfoCard } from './PersonalInfoCard';
import { ContactCard } from './Sidebar/ContactCard';
import { DoctorNotesCard } from './Sidebar/DoctorNotesCard';
import { DocumentsCard } from './Sidebar/DocumentsCard';
import { MedicationAllergyCard } from './Sidebar/MedicationAllergyCard';
import { VisitSummaryCard } from './VisitSummaryCard';
import { VisitTimelineCard } from './VisitTimelineCard';
import { VitalsCard } from './VitalsCard';

interface OverviewTabProps {
  patient: PatientDetail;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const OverviewTab = ({ patient }: OverviewTabProps) => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
      {/* Left Column: Main Content */}
      <div className='xl:col-span-9 space-y-6'>
        <motion.div variants={item}>
          <PersonalInfoCard info={patient.personalInfo} patient={patient} />
        </motion.div>
        <motion.div variants={item}>
          <VisitSummaryCard visit={patient.todayVisit} />
        </motion.div>
        <motion.div variants={item}>
          <VitalsCard vitals={patient.vitals} />
        </motion.div>
        <motion.div variants={item}>
          <VisitTimelineCard timeline={patient.timeline} />
        </motion.div>
      </div>

      {/* Right Column: Sidebar Widgets */}
      <div className='xl:col-span-3 space-y-6'>
        <motion.div variants={item}>
          <MedicationAllergyCard
            allergies={patient.allergies}
            medications={patient.medications}
          />
        </motion.div>
        <motion.div variants={item}>
          <DocumentsCard documents={patient.documents} />
        </motion.div>
        <motion.div variants={item}>
          <DoctorNotesCard notes={patient.doctorNotes} />
        </motion.div>
        <motion.div variants={item}>
          <ContactCard
            contact={patient.contact}
            nextAppointment={patient.nextAppointment}
          />
        </motion.div>
      </div>
    </div>
  );
};
