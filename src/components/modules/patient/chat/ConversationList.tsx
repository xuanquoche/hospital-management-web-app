'use client';

import { MessageCircle, Plus, Loader2 } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Conversation, ConversationStatus } from '@/types/conversation';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
  onNewConversation: () => void;
  loading?: boolean;
}

const statusConfig: Record<ConversationStatus, { bg: string; text: string; label: string }> = {
  OPEN: { bg: 'bg-blue-500', text: 'text-white', label: 'Mở' },
  PENDING: { bg: 'bg-amber-500', text: 'text-white', label: 'Chờ xử lý' },
  IN_PROGRESS: { bg: 'bg-teal-500', text: 'text-white', label: 'Đang xử lý' },
  RESOLVED: {
    bg: 'bg-emerald-500',
    text: 'text-white',
    label: 'Đã giải quyết',
  },
  CLOSED: { bg: 'bg-slate-400', text: 'text-white', label: 'Đã đóng' },
};

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
  onNewConversation,
  loading,
}) => {
  const formatTime = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút`;
    if (diffHours < 24) return `${diffHours} giờ`;
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày`;
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center bg-white'>
        <div className='flex flex-col items-center gap-3'>
          <Loader2 className='h-8 w-8 animate-spin text-teal-500' />
          <span className='text-sm text-slate-500'>Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col bg-white'>
      {/* Header */}
      <div className='border-b border-slate-200 p-4'>
        <h2 className='text-lg font-semibold text-slate-800 mb-3'>Tin nhắn hỗ trợ</h2>
        <Button onClick={onNewConversation} className='w-full gap-2 bg-teal-500 hover:bg-teal-600 text-white'>
          <Plus className='h-4 w-4' />
          Cuộc hội thoại mới
        </Button>
      </div>

      {/* Conversation List */}
      <div className='flex-1 overflow-y-auto'>
        {conversations.length === 0 ? (
          <div className='flex flex-col items-center justify-center p-8 text-center h-full'>
            <div className='rounded-full bg-slate-100 p-4 mb-4'>
              <MessageCircle className='h-10 w-10 text-slate-400' />
            </div>
            <p className='font-medium text-slate-600'>Chưa có cuộc hội thoại</p>
            <p className='mt-1 text-sm text-slate-400 max-w-[200px]'>Bắt đầu một cuộc hội thoại mới để được hỗ trợ</p>
          </div>
        ) : (
          <div className='divide-y divide-slate-100'>
            {conversations.map((conversation) => {
              const isSelected = selectedId === conversation.id;
              const status = statusConfig[conversation.status];
              const hasUnread = conversation.lastMessage && !conversation.lastMessage.isRead;

              return (
                <div
                  key={conversation.id}
                  onClick={() => onSelect(conversation)}
                  className={cn(
                    'cursor-pointer p-4 transition-all duration-200',
                    isSelected
                      ? 'bg-teal-50 border-l-4 border-teal-500'
                      : 'hover:bg-slate-50 border-l-4 border-transparent',
                    hasUnread && !isSelected && 'bg-blue-50/50'
                  )}
                >
                  <div className='flex items-start gap-3'>
                    {/* Avatar */}
                    <div className='relative shrink-0'>
                      <div className='h-12 w-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-sm'>
                        A
                      </div>
                      {hasUnread && (
                        <span className='absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500 border-2 border-white' />
                      )}
                    </div>

                    {/* Content */}
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center justify-between gap-2'>
                        <h4
                          className={cn(
                            'truncate text-sm',
                            hasUnread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'
                          )}
                        >
                          {conversation.subject || 'Hỗ trợ'}
                        </h4>
                        <span className='text-xs text-slate-400 shrink-0'>
                          {formatTime(conversation.lastMessageAt)}
                        </span>
                      </div>

                      <p
                        className={cn(
                          'mt-1 truncate text-sm',
                          hasUnread ? 'text-slate-800 font-medium' : 'text-slate-500'
                        )}
                      >
                        {conversation.lastMessage?.content || 'Bắt đầu cuộc hội thoại...'}
                      </p>

                      {/* Tag */}
                      <div className='mt-2'>
                        <span
                          className={cn(
                            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                            status.bg,
                            status.text
                          )}
                        >
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
