'use client';

import { MessageCircle, Search, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import {
  Conversation,
  ConversationPriority,
  ConversationStatus,
} from '@/types/conversation';

interface AdminConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
  loading?: boolean;
}

const statusConfig: Record<
  ConversationStatus,
  { bg: string; text: string; label: string }
> = {
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

const priorityConfig: Record<
  ConversationPriority,
  { bg: string; text: string; label: string }
> = {
  LOW: { bg: 'bg-slate-200', text: 'text-slate-600', label: 'Thấp' },
  NORMAL: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Bình thường' },
  HIGH: { bg: 'bg-orange-500', text: 'text-white', label: 'Cao' },
  URGENT: { bg: 'bg-red-500', text: 'text-white', label: 'Khẩn cấp' },
};

// Generate color from name
const getAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-emerald-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
  ];
  const index = name ? name.charCodeAt(0) % colors.length : 0;
  return colors[index];
};

export const AdminConversationList: React.FC<AdminConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
  loading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      !searchTerm ||
      c.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      {/* Header & Filters */}
      <div className='space-y-3 border-b border-slate-200 p-4'>
        <h2 className='text-lg font-semibold text-slate-800'>
          Danh sách hội thoại
        </h2>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
          <Input
            placeholder='Tìm theo tên, chủ đề...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-9 bg-slate-50 border-slate-200 focus:bg-white'
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className='bg-slate-50 border-slate-200'>
            <SelectValue placeholder='Lọc theo trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả trạng thái</SelectItem>
            <SelectItem value='OPEN'>Mở</SelectItem>
            <SelectItem value='PENDING'>Chờ xử lý</SelectItem>
            <SelectItem value='IN_PROGRESS'>Đang xử lý</SelectItem>
            <SelectItem value='RESOLVED'>Đã giải quyết</SelectItem>
            <SelectItem value='CLOSED'>Đã đóng</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Conversation List */}
      <div className='flex-1 overflow-y-auto'>
        {filteredConversations.length === 0 ? (
          <div className='flex flex-col items-center justify-center p-8 text-center h-full'>
            <div className='rounded-full bg-slate-100 p-4 mb-4'>
              <MessageCircle className='h-10 w-10 text-slate-400' />
            </div>
            <p className='font-medium text-slate-600'>
              Không có cuộc hội thoại
            </p>
            <p className='mt-1 text-sm text-slate-400 max-w-[200px]'>
              Các yêu cầu hỗ trợ từ bệnh nhân sẽ hiển thị ở đây
            </p>
          </div>
        ) : (
          <div className='divide-y divide-slate-100'>
            {filteredConversations.map((conversation) => {
              const isSelected = selectedId === conversation.id;
              const status = statusConfig[conversation.status];
              const priority = priorityConfig[conversation.priority];
              const hasUnread =
                conversation.lastMessage &&
                !conversation.lastMessage.isRead &&
                conversation.lastMessage.senderRole === 'PATIENT';
              const patientName = conversation.patient?.name || 'Bệnh nhân';
              const initials = patientName.charAt(0).toUpperCase();

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
                      <div
                        className={cn(
                          'h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm',
                          getAvatarColor(patientName)
                        )}
                      >
                        {initials}
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
                            hasUnread
                              ? 'font-bold text-slate-900'
                              : 'font-medium text-slate-700'
                          )}
                        >
                          {patientName}
                        </h4>
                        <span className='text-xs text-slate-400 shrink-0'>
                          {formatTime(conversation.lastMessageAt)}
                        </span>
                      </div>

                      <p className='text-xs text-slate-500 truncate mt-0.5'>
                        {conversation.subject || 'Không có chủ đề'}
                      </p>

                      <p
                        className={cn(
                          'mt-1 truncate text-sm',
                          hasUnread
                            ? 'text-slate-800 font-medium'
                            : 'text-slate-500'
                        )}
                      >
                        {conversation.lastMessage?.content ||
                          'Chưa có tin nhắn'}
                      </p>

                      {/* Tags */}
                      <div className='mt-2 flex items-center gap-2'>
                        <span
                          className={cn(
                            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                            status.bg,
                            status.text
                          )}
                        >
                          {status.label}
                        </span>
                        {conversation.priority !== 'NORMAL' && (
                          <span
                            className={cn(
                              'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                              priority.bg,
                              priority.text
                            )}
                          >
                            {priority.label}
                          </span>
                        )}
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
