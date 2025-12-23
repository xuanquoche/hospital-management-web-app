'use client';

import { MessageSquare, Users, CheckCircle, Clock } from 'lucide-react';
import React, { useState, useCallback } from 'react';

import { ChatWindow } from '@/components/modules/patient/chat/ChatWindow';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useAdminConversations } from '@/hooks/use-conversations';
import { Conversation } from '@/types/conversation';

import { AdminChatActions } from './AdminChatActions';
import { AdminConversationList } from './AdminConversationList';

export const AdminChatContent = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const {
    conversations,
    loading,
    unreadCount,
    updateConversation,
    closeConversation,
    refetch,
    fetchUnreadCount,
  } = useAdminConversations();

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleUpdateConversation = async (payload: any) => {
    if (!selectedConversation) return;
    const updated = await updateConversation(selectedConversation.id, payload);
    setSelectedConversation(updated);
  };

  const handleCloseConversation = async () => {
    if (!selectedConversation) return;
    const updated = await closeConversation(selectedConversation.id);
    setSelectedConversation(updated);
  };

  const handleConversationUpdate = useCallback(() => {
    refetch();
    fetchUnreadCount();
  }, [refetch, fetchUnreadCount]);

  const stats = {
    total: conversations.length,
    open: conversations.filter(
      (c) => c.status === 'OPEN' || c.status === 'PENDING'
    ).length,
    inProgress: conversations.filter((c) => c.status === 'IN_PROGRESS').length,
    resolved: conversations.filter((c) => c.status === 'RESOLVED').length,
  };

  return (
    <div className='h-screen bg-slate-50 p-6 flex flex-col'>
      {/* Header */}
      <div className='mb-4 shrink-0'>
        <div className='flex items-center gap-3'>
          <h1 className='text-2xl font-bold text-slate-900'>Quản lý hỗ trợ</h1>
          {unreadCount > 0 && (
            <Badge className='h-6 min-w-6 justify-center bg-red-500 hover:bg-red-600'>
              {unreadCount} mới
            </Badge>
          )}
        </div>
        <p className='mt-1 text-sm text-slate-500'>
          Quản lý và phản hồi các yêu cầu hỗ trợ từ bệnh nhân
        </p>
      </div>

      {/* Stats Cards */}
      <div className='mb-4 grid grid-cols-4 gap-4 shrink-0'>
        <Card className='flex items-center gap-4 p-4 bg-white'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500'>
            <MessageSquare className='h-6 w-6 text-white' />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-900'>{stats.total}</p>
            <p className='text-xs text-slate-500'>Tổng hội thoại</p>
          </div>
        </Card>

        <Card className='flex items-center gap-4 p-4 bg-white'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500'>
            <Clock className='h-6 w-6 text-white' />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-900'>{stats.open}</p>
            <p className='text-xs text-slate-500'>Đang chờ</p>
          </div>
        </Card>

        <Card className='flex items-center gap-4 p-4 bg-white'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500'>
            <Users className='h-6 w-6 text-white' />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-900'>
              {stats.inProgress}
            </p>
            <p className='text-xs text-slate-500'>Đang xử lý</p>
          </div>
        </Card>

        <Card className='flex items-center gap-4 p-4 bg-white'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500'>
            <CheckCircle className='h-6 w-6 text-white' />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-900'>
              {stats.resolved}
            </p>
            <p className='text-xs text-slate-500'>Đã giải quyết</p>
          </div>
        </Card>
      </div>

      {/* Main Chat Area - Side by Side Layout */}
      <div className='flex-1 min-h-0 flex flex-row gap-4'>
        {/* Left: Conversation List */}
        <Card className='w-[380px] shrink-0 overflow-hidden'>
          <AdminConversationList
            conversations={conversations}
            selectedId={selectedConversation?.id}
            onSelect={handleSelectConversation}
            loading={loading}
          />
        </Card>

        {/* Right: Chat Window */}
        <Card className='flex-1 min-w-0 overflow-hidden flex flex-col'>
          {selectedConversation && (
            <AdminChatActions
              conversation={selectedConversation}
              onUpdate={handleUpdateConversation}
              onClose={handleCloseConversation}
            />
          )}
          <div className='flex-1 min-h-0'>
            <ChatWindow
              conversation={selectedConversation}
              isAdmin={true}
              onConversationUpdate={handleConversationUpdate}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
