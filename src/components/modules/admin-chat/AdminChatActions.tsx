'use client';

import { X, CheckCircle, AlertTriangle, Clock, Settings2, Loader2 } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  Conversation,
  ConversationPriority,
  ConversationStatus,
  UpdateConversationPayload,
} from '@/types/conversation';

interface AdminChatActionsProps {
  conversation: Conversation;
  onUpdate: (payload: UpdateConversationPayload) => Promise<void>;
  onClose: () => Promise<void>;
}

const statusConfig: Record<ConversationStatus, { color: string; bg: string; label: string }> = {
  OPEN: { color: 'text-blue-700', bg: 'bg-blue-50', label: 'Mở' },
  PENDING: { color: 'text-amber-700', bg: 'bg-amber-50', label: 'Chờ xử lý' },
  IN_PROGRESS: {
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    label: 'Đang xử lý',
  },
  RESOLVED: {
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    label: 'Đã giải quyết',
  },
  CLOSED: { color: 'text-slate-500', bg: 'bg-slate-100', label: 'Đã đóng' },
};

const priorityConfig: Record<ConversationPriority, { color: string; bg: string; label: string }> = {
  LOW: { color: 'text-slate-500', bg: 'bg-slate-50', label: 'Thấp' },
  NORMAL: { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Bình thường' },
  HIGH: { color: 'text-orange-600', bg: 'bg-orange-50', label: 'Cao' },
  URGENT: { color: 'text-red-600', bg: 'bg-red-50', label: 'Khẩn cấp' },
};

export const AdminChatActions: React.FC<AdminChatActionsProps> = ({ conversation, onUpdate, onClose }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState<ConversationStatus>(conversation.status);
  const [newPriority, setNewPriority] = useState<ConversationPriority>(conversation.priority);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await onUpdate({
        status: newStatus,
        priority: newPriority,
      });
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = async () => {
    try {
      setLoading(true);
      await onClose();
      setShowCloseModal(false);
    } catch (error) {
      console.error('Error closing conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickResolve = async () => {
    try {
      setLoading(true);
      await onUpdate({ status: 'RESOLVED' });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const status = statusConfig[conversation.status];
  const priority = priorityConfig[conversation.priority];

  if (conversation.status === 'CLOSED') {
    return (
      <div className='flex items-center justify-between bg-slate-100 px-4 py-2 border-b'>
        <div className='flex items-center gap-2'>
          <span className={cn('text-xs font-medium px-2 py-1 rounded-full', status.bg, status.color)}>
            {status.label}
          </span>
          <span className='text-sm text-slate-500'>Cuộc hội thoại đã đóng</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='flex items-center justify-between bg-slate-50 px-4 py-2 border-b border-slate-200'>
        <div className='flex items-center gap-2'>
          <span className={cn('text-xs font-medium px-2 py-1 rounded-full', status.bg, status.color)}>
            {status.label}
          </span>
          <span className={cn('text-xs font-medium px-2 py-1 rounded-full', priority.bg, priority.color)}>
            {priority.label}
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowUpdateModal(true)}
            className='gap-1 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
          >
            <Settings2 className='h-4 w-4' />
            Cập nhật
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleQuickResolve}
            disabled={loading}
            className='gap-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
          >
            {loading ? <Loader2 className='h-4 w-4 animate-spin' /> : <CheckCircle className='h-4 w-4' />}
            Đã giải quyết
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowCloseModal(true)}
            className='gap-1 text-red-600 hover:text-red-700 hover:bg-red-50'
          >
            <X className='h-4 w-4' />
            Đóng
          </Button>
        </div>
      </div>

      {/* Update Modal */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Cập nhật cuộc hội thoại</DialogTitle>
            <DialogDescription>Thay đổi trạng thái và độ ưu tiên của cuộc hội thoại</DialogDescription>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label className='text-sm font-medium'>Trạng thái</Label>
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as ConversationStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='OPEN'>🔵 Mở</SelectItem>
                  <SelectItem value='PENDING'>🟡 Chờ xử lý</SelectItem>
                  <SelectItem value='IN_PROGRESS'>🔷 Đang xử lý</SelectItem>
                  <SelectItem value='RESOLVED'>🟢 Đã giải quyết</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label className='text-sm font-medium'>Độ ưu tiên</Label>
              <Select value={newPriority} onValueChange={(v) => setNewPriority(v as ConversationPriority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='LOW'>⬜ Thấp</SelectItem>
                  <SelectItem value='NORMAL'>🔵 Bình thường</SelectItem>
                  <SelectItem value='HIGH'>🟠 Cao</SelectItem>
                  <SelectItem value='URGENT'>🔴 Khẩn cấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant='outline' onClick={() => setShowUpdateModal(false)} disabled={loading}>
              Hủy
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={loading}
              className='bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600'
            >
              {loading ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  Đang cập nhật...
                </>
              ) : (
                'Cập nhật'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Close Confirmation Modal */}
      <Dialog open={showCloseModal} onOpenChange={setShowCloseModal}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 text-red-600'>
              <AlertTriangle className='h-5 w-5' />
              Đóng cuộc hội thoại
            </DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn đóng cuộc hội thoại này? Bệnh nhân sẽ không thể gửi thêm tin nhắn.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className='mt-4'>
            <Button variant='outline' onClick={() => setShowCloseModal(false)} disabled={loading}>
              Hủy
            </Button>
            <Button variant='destructive' onClick={handleClose} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                  Đang đóng...
                </>
              ) : (
                'Đóng cuộc hội thoại'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
