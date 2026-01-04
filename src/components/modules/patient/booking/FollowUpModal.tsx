'use client';

import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AIResponseNeedsMoreInfo } from '@/types/ai-booking';

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AIResponseNeedsMoreInfo;
  onSubmit: (answer: string) => void;
  isLoading: boolean;
}

export const FollowUpModal = ({
  isOpen,
  onClose,
  data,
  onSubmit,
  isLoading,
}: FollowUpModalProps) => {
  const [customAnswer, setCustomAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAnswer.trim()) {
      onSubmit(customAnswer);
      setCustomAnswer('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:w-[90%] max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-white border-0 shadow-2xl sm:rounded-2xl'>
        <div className='bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white'>
          <DialogHeader>
            <DialogTitle className='text-xl font-bold'>
              Bác sĩ AI cần thêm thông tin
            </DialogTitle>
          </DialogHeader>
          <p className='mt-2 text-teal-50 opacity-90'>
            Để tư vấn chính xác nhất, vui lòng cung cấp thêm chi tiết.
          </p>
        </div>

        <div className='p-6 space-y-6'>
          <div className='bg-slate-50 p-4 rounded-xl border border-slate-100'>
            <p className='font-medium text-slate-900'>
              {data.followUpQuestion}
            </p>
          </div>

          <div className='space-y-3'>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-500'>
              Gợi ý câu trả lời
            </p>
            <div className='flex flex-col gap-2'>
              {data.suggestedQuestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSubmit(suggestion)}
                  disabled={isLoading}
                  className='text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-colors text-slate-700 text-sm font-medium disabled:opacity-50'
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className='relative'>
            <Input
              value={customAnswer}
              onChange={(e) => setCustomAnswer(e.target.value)}
              placeholder='Hoặc nhập câu trả lời của bạn...'
              className='pr-12'
              disabled={isLoading}
            />
            <Button
              size='icon'
              type='submit'
              disabled={!customAnswer.trim() || isLoading}
              className='absolute right-1 top-1 h-8 w-8 rounded-lg bg-teal-600 hover:bg-teal-700'
            >
              <Send className='h-4 w-4' />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
