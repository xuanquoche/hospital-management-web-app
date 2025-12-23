'use client';

import { MessageSquare, HelpCircle } from 'lucide-react';
import React, { useState, useCallback } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { usePatientConversations } from '@/hooks/use-conversations';
import { Conversation } from '@/types/conversation';

import { ChatWindow } from './ChatWindow';
import { ConversationList } from './ConversationList';
import { NewConversationModal } from './NewConversationModal';

export const PatientChatContent = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const {
    conversations,
    loading,
    unreadCount,
    createConversation,
    refetch,
    fetchUnreadCount,
  } = usePatientConversations();

  const handleCreateConversation = async (payload: {
    subject?: string;
    initialMessage?: string;
  }) => {
    const newConversation = await createConversation(payload);
    setSelectedConversation(newConversation);
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleConversationUpdate = useCallback(() => {
    refetch();
    fetchUnreadCount();
  }, [refetch, fetchUnreadCount]);

  return (
    <div className='h-screen bg-slate-50 p-6 flex flex-col'>
      {/* Header */}
      <div className='mb-4 shrink-0'>
        <div className='flex items-center gap-3'>
          <h1 className='text-2xl font-bold text-slate-900'>Hỗ trợ</h1>
          {unreadCount > 0 && (
            <Badge className='h-6 min-w-6 justify-center bg-red-500 hover:bg-red-600'>
              {unreadCount} mới
            </Badge>
          )}
        </div>
        <p className='mt-1 text-sm text-slate-500'>
          Liên hệ với bộ phận hỗ trợ để được tư vấn và giải đáp thắc mắc
        </p>
      </div>

      {/* Stats Cards */}
      <div className='mb-4 grid grid-cols-3 gap-4 shrink-0'>
        <Card className='flex items-center gap-4 p-4 bg-white'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500'>
            <MessageSquare className='h-6 w-6 text-white' />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-900'>
              {conversations.length}
            </p>
            <p className='text-xs text-slate-500'>Tổng hội thoại</p>
          </div>
        </Card>

        <Card className='flex items-center gap-4 p-4 bg-white'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500'>
            <HelpCircle className='h-6 w-6 text-white' />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-900'>
              {
                conversations.filter(
                  (c) => c.status === 'OPEN' || c.status === 'IN_PROGRESS'
                ).length
              }
            </p>
            <p className='text-xs text-slate-500'>Đang xử lý</p>
          </div>
        </Card>

        <Card className='flex items-center gap-4 p-4 bg-white'>
          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500'>
            <MessageSquare className='h-6 w-6 text-white' />
          </div>
          <div>
            <p className='text-2xl font-bold text-slate-900'>
              {
                conversations.filter(
                  (c) => c.status === 'RESOLVED' || c.status === 'CLOSED'
                ).length
              }
            </p>
            <p className='text-xs text-slate-500'>Đã giải quyết</p>
          </div>
        </Card>
      </div>

      {/* Main Chat Area - Side by Side Layout */}
      <div className='flex-1 min-h-0 flex flex-row gap-4'>
        {/* Left: Conversation List */}
        <Card className='w-[350px] shrink-0 overflow-hidden'>
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation?.id}
            onSelect={handleSelectConversation}
            onNewConversation={() => setShowNewModal(true)}
            loading={loading}
          />
        </Card>

        {/* Right: Chat Window */}
        <Card className='flex-1 min-w-0 overflow-hidden flex flex-col'>
          <ChatWindow
            conversation={selectedConversation}
            isAdmin={false}
            onConversationUpdate={handleConversationUpdate}
          />
        </Card>
      </div>

      <NewConversationModal
        open={showNewModal}
        onClose={() => setShowNewModal(false)}
        onSubmit={handleCreateConversation}
      />
    </div>
  );
};
