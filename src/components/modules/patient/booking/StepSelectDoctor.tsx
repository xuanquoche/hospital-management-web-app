'use client';

import { motion } from 'framer-motion';
import { Sparkles, Stethoscope } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { clientFetcher } from '@/lib/fetcher';
import { useAppointmentStore } from '@/store/use-appointment-store';
import {
  AIBookingRequest,
  AIBookingResponse,
  AIDoctorInfo,
  AIRecommendation,
  AIResponseNeedsMoreInfo,
} from '@/types/ai-booking';
import { Doctor } from '@/types/doctor';

import { DoctorList } from './DoctorList';
import { FollowUpModal } from './FollowUpModal';

interface StepSelectDoctorProps {
  selectedDoctorId?: string | number | null;
  onSelectDoctor?: (doctor: Doctor | AIDoctorInfo) => void;
}

export const StepSelectDoctor = ({
  selectedDoctorId,
  onSelectDoctor,
}: StepSelectDoctorProps) => {
  const { symptoms, patientInfo, setSymptoms, aiAnalysis, setAiAnalysis } =
    useAppointmentStore();

  const [isLoading, setIsLoading] = useState(false);
  const [followUpData, setFollowUpData] =
    useState<AIResponseNeedsMoreInfo | null>(null);
  const [recommendedDoctors, setRecommendedDoctors] = useState<
    (Doctor | AIRecommendation)[] | undefined
  >(undefined);

  // Initialize from persisted state
  React.useEffect(() => {
    if (aiAnalysis?.responseType === 'SUGGESTION') {
      setRecommendedDoctors(aiAnalysis.data.recommendations);
    }
  }, [aiAnalysis]);

  const callAI = async (
    currentSymptoms: string,
    additionalContext: string = ''
  ) => {
    if (!currentSymptoms.trim()) return;

    setIsLoading(true);
    try {
      // Merge context if provided (for follow-up)
      const fullSymptoms = additionalContext
        ? `${currentSymptoms}\n\nThêm thông tin: ${additionalContext}`
        : currentSymptoms;

      // Update store if changed via concatenation
      if (additionalContext) {
        setSymptoms(fullSymptoms);
      }

      const payload: AIBookingRequest = {
        symptoms: fullSymptoms,
        patientInfo: {
          age: patientInfo?.dateOfBirth
            ? new Date().getFullYear() -
              new Date(patientInfo.dateOfBirth).getFullYear()
            : 30, // Fallback/Default
          gender: patientInfo?.gender || 'OTHER',
          // medicalHistory could be added here if available in store/profile
        },
        preferredDate: new Date().toISOString().split('T')[0], // Default to today/soon
        examinationType: 'IN_PERSON',
      };

      const res = await clientFetcher.post(
        '/ai/recommend-doctor/authenticated',
        payload
      );
      const data = res.data as AIBookingResponse;
      console.log('data AI responses ', data);

      if (data.responseType === 'NEEDS_MORE_INFO') {
        setFollowUpData(data);
      } else if (data.responseType === 'SUGGESTION') {
        setFollowUpData(null);
        setAiAnalysis(data);
        console.log(
          'data AI responses data suggestion ',
          data.data.recommendations
        );
        // Pass recommendations directly
        setRecommendedDoctors(data.data.recommendations);
      }
    } catch (error) {
      console.error('AI API Error:', error);
      // Fallback or toast error could go here
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitialSubmit = () => {
    callAI(symptoms);
  };

  const handleFollowUpSubmit = (answer: string) => {
    // Re-call AI with updated symptom context
    callAI(symptoms, answer);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='space-y-8'
    >
      {/* Symptom Input Section */}
      <section className='space-y-4'>
        <div className='flex items-center gap-2'>
          <div className='p-2 bg-teal-100 rounded-lg text-teal-600'>
            <Stethoscope className='h-5 w-5' />
          </div>
          <h2 className='text-lg font-bold text-slate-900'>
            Triệu chứng & Nhu cầu khám
          </h2>
        </div>

        <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-slate-700'>
              Mô tả triệu chứng của bạn
            </label>
            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder='Ví dụ: Tôi bị đau đầu dữ dội 3 ngày nay, kèm theo chóng mặt...'
              className='min-h-[120px] resize-none focus-visible:ring-teal-500'
            />
          </div>

          <div className='flex justify-end'>
            <Button
              onClick={handleInitialSubmit}
              disabled={isLoading || !symptoms.trim()}
              className='bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white shadow-md'
            >
              {isLoading ? (
                'Đang phân tích...'
              ) : (
                <>
                  <Sparkles className='mr-2 h-4 w-4' />
                  Tìm bác sĩ phù hợp
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* AI Analysis Result (if available) */}
      {aiAnalysis?.responseType === 'SUGGESTION' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className='space-y-6'
        >
          <div className='bg-teal-50 border border-teal-100 p-4 rounded-xl'>
            <h3 className='font-bold text-teal-800 mb-3 flex items-center gap-2'>
              <Sparkles className='h-4 w-4' />
              Phân tích y khoa
            </h3>
            <div className='space-y-3'>
              <div>
                <p className='text-xs font-semibold text-teal-600 uppercase mb-1'>
                  Khả năng cao nhất
                </p>
                <div className='flex flex-wrap gap-2'>
                  {aiAnalysis.data.analysis.possibleConditions.map(
                    (condition, idx) => (
                      <span
                        key={idx}
                        className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-teal-700 border border-teal-200'
                      >
                        {condition}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-xs font-semibold text-teal-600 uppercase mb-1'>
                    Mức độ khẩn cấp
                  </p>
                  <p className='text-sm font-medium text-teal-900'>
                    {aiAnalysis.data.analysis.urgencyLevel}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold text-teal-600 uppercase mb-1'>
                    Chuyên khoa
                  </p>
                  <p className='text-sm font-medium text-teal-900'>
                    {aiAnalysis.data.analysis.recommendedSpecialties.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DoctorList
            doctors={recommendedDoctors}
            selectedDoctorId={selectedDoctorId}
            onSelectDoctor={onSelectDoctor}
            isLoading={isLoading}
          />
        </motion.div>
      )}

      {/* Manual Selection Fallback (optional title if list is showing) */}
      {!aiAnalysis && !recommendedDoctors && (
        <div className='text-center py-8 text-slate-400'>
          <p>Nhập triệu chứng để nhận gợi ý bác sĩ tốt nhất.</p>
        </div>
      )}

      {/* Follow Up Modal */}
      {followUpData && (
        <FollowUpModal
          isOpen={!!followUpData}
          onClose={() => setFollowUpData(null)}
          data={followUpData}
          onSubmit={handleFollowUpSubmit}
          isLoading={isLoading}
        />
      )}
    </motion.div>
  );
};
