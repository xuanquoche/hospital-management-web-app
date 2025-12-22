'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateConversationPayload } from '@/types/conversation';

interface NewConversationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateConversationPayload) => Promise<void>;
}

export const NewConversationModal: React.FC<NewConversationModalProps> = ({ open, onClose, onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      await onSubmit({
        subject: subject.trim() || undefined,
        initialMessage: message.trim(),
      });
      setSubject('');
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Error creating conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Cuộc hội thoại mới</DialogTitle>
          <DialogDescription>Gửi tin nhắn cho bộ phận hỗ trợ để được tư vấn</DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='subject'>Chủ đề (tùy chọn)</Label>
            <Input
              id='subject'
              placeholder='VD: Hỏi về lịch hẹn khám'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='message'>Nội dung tin nhắn</Label>
            <Textarea
              id='message'
              placeholder='Nhập nội dung tin nhắn của bạn...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={onClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || loading}
            className='bg-teal-600 hover:bg-teal-700'
          >
            {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
