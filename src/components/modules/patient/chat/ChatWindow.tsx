'use client';

import {
  Send,
  Paperclip,
  MoreVertical,
  CheckCheck,
  Check,
  RefreshCw,
  MessageCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { useChatSocket } from '@/hooks/use-chat-socket';
import { useMessages } from '@/hooks/use-conversations';
import { cn } from '@/lib/utils';
import { Conversation, Message } from '@/types/conversation';

interface ChatWindowProps {
  conversation: Conversation | null;
  currentUserId?: string;
  isAdmin?: boolean;
  onConversationUpdate?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  currentUserId,
  isAdmin = false,
  onConversationUpdate,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    messages,
    loading,
    refetch,
    sendMessage: httpSendMessage,
  } = useMessages({
    conversationId: conversation?.id || '',
    autoFetch: !!conversation,
    isAdmin,
  });

  const handleNewMessage = useCallback((message: Message) => {
    setLocalMessages((prev) => {
      const exists = prev.some((m) => m.id === message.id);
      if (exists) return prev;
      return [...prev, message];
    });
  }, []);

  const handleTyping = useCallback(
    (data: { userId: string; userRole: string; isTyping: boolean }) => {
      const isSelf = isAdmin
        ? data.userRole === 'ADMIN'
        : data.userRole === 'PATIENT';
      if (!isSelf) {
        setIsOtherTyping(data.isTyping);
      }
    },
    [isAdmin]
  );

  const handleMessagesRead = useCallback(() => {
    setLocalMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
  }, []);

  const {
    isConnected,
    connectionError,
    sendMessage: socketSendMessage,
    sendTyping,
    markAsRead,
    retry: retryConnection,
  } = useChatSocket({
    conversationId: conversation?.id,
    onNewMessage: handleNewMessage,
    onTyping: handleTyping,
    onMessagesRead: handleMessagesRead,
    onConversationUpdate,
  });

  // Sync messages from API
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [localMessages, scrollToBottom]);

  useEffect(() => {
    if (conversation && isConnected) {
      markAsRead();
    }
  }, [conversation, isConnected, markAsRead]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending || !conversation) return;

    const content = newMessage.trim();
    setNewMessage('');
    setSending(true);
    sendTyping(false);

    // Optimistic update
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: Message = {
      id: tempId,
      conversationId: conversation.id,
      senderId: currentUserId || '',
      senderRole: isAdmin ? 'ADMIN' : 'PATIENT',
      content,
      messageType: 'TEXT',
      isRead: false,
      attachmentUrl: null,
      readAt: null,
      createdAt: new Date().toISOString(),
    };
    setLocalMessages((prev) => [...prev, optimisticMessage]);

    try {
      let sentMsg: Message;
      if (isConnected) {
        sentMsg = await socketSendMessage(content);
      } else {
        sentMsg = await httpSendMessage({ content });
      }
      // Replace optimistic message with real one
      setLocalMessages((prev) =>
        prev.map((m) => (m.id === tempId ? sentMsg : m))
      );
    } catch (error) {
      console.error('Send error:', error);
      // Remove optimistic message on error
      setLocalMessages((prev) => prev.filter((m) => m.id !== tempId));
      setNewMessage(content);
    } finally {
      setSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    if (isConnected) {
      sendTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => sendTyping(false), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hôm nay';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hôm qua';
    }
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const groupMessagesByDate = (msgs: Message[]) => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = '';

    msgs.forEach((msg) => {
      const msgDate = new Date(msg.createdAt).toDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: msg.createdAt, messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  };

  const isOwnMessage = (message: Message) => {
    return isAdmin
      ? message.senderRole === 'ADMIN'
      : message.senderRole === 'PATIENT';
  };

  // Empty state
  if (!conversation) {
    return (
      <div className='flex h-full flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          <div className='rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 p-6 shadow-lg'>
            <MessageCircle className='h-12 w-12 text-white' />
          </div>
          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-slate-800'>
              Chào mừng đến với Hỗ trợ
            </h3>
            <p className='max-w-sm text-sm text-slate-500'>
              Chọn một cuộc hội thoại từ danh sách bên trái hoặc tạo mới để bắt
              đầu nhắn tin
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col bg-white'>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 shadow-sm'>
        <div className='flex items-center gap-3'>
          <div className='relative shrink-0'>
            <div
              className='flex items-center justify-center text-white font-bold text-lg'
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#14b8a6',
              }}
            >
              {isAdmin
                ? conversation.patient?.name?.charAt(0).toUpperCase() || 'B'
                : 'A'}
            </div>
            <span
              className='absolute bottom-0 right-0 border-2 border-white'
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: isConnected ? '#10b981' : '#94a3b8',
              }}
            />
          </div>
          <div className='flex flex-col'>
            <h3 className='font-semibold text-slate-900'>
              {isAdmin
                ? conversation.patient?.name || 'Bệnh nhân'
                : 'Hỗ trợ Admin'}
            </h3>
            <div className='flex items-center gap-2'>
              {isConnected ? (
                <span className='text-xs text-emerald-600 font-medium'>
                  ● Trực tuyến
                </span>
              ) : (
                <span className='flex items-center gap-1 text-xs text-amber-600'>
                  <Loader2 className='h-3 w-3 animate-spin' />
                  Đang kết nối...
                </span>
              )}
              {conversation.subject && (
                <>
                  <span className='text-slate-300'>•</span>
                  <span className='text-xs text-slate-500 truncate max-w-[150px]'>
                    {conversation.subject}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          {!isConnected && (
            <Button
              variant='ghost'
              size='sm'
              onClick={retryConnection}
              className='text-slate-500 hover:text-teal-600'
            >
              <RefreshCw className='h-4 w-4 mr-1' />
              Thử lại
            </Button>
          )}
          <Button variant='ghost' size='icon' className='text-slate-500'>
            <MoreVertical className='h-5 w-5' />
          </Button>
        </div>
      </div>

      {/* Connection Error Banner */}
      {connectionError && !isConnected && (
        <div className='flex items-center gap-2 bg-amber-50 px-4 py-2 text-sm text-amber-700 border-b border-amber-100'>
          <AlertCircle className='h-4 w-4 shrink-0' />
          <span>
            Đang sử dụng chế độ offline - Tin nhắn sẽ được cập nhật mỗi 5 giây
          </span>
        </div>
      )}

      {/* Messages Area */}
      <div className='flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-white p-4'>
        {loading ? (
          <div className='flex h-full items-center justify-center'>
            <div className='flex flex-col items-center gap-3'>
              <Loader2 className='h-8 w-8 animate-spin text-teal-500' />
              <span className='text-sm text-slate-500'>
                Đang tải tin nhắn...
              </span>
            </div>
          </div>
        ) : localMessages.length === 0 ? (
          <div className='flex h-full flex-col items-center justify-center text-center'>
            <div className='rounded-full bg-slate-100 p-4 mb-4'>
              <MessageCircle className='h-8 w-8 text-slate-400' />
            </div>
            <p className='font-medium text-slate-600'>Chưa có tin nhắn</p>
            <p className='mt-1 text-sm text-slate-400'>
              Hãy bắt đầu cuộc hội thoại!
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {groupMessagesByDate(localMessages).map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* Date Separator */}
                <div className='flex items-center justify-center my-4'>
                  <div className='bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-slate-100'>
                    <span className='text-xs font-medium text-slate-500'>
                      {formatDate(group.date)}
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className='space-y-2'>
                  {group.messages.map((message) => {
                    const own = isOwnMessage(message);
                    const isTemp = message.id.startsWith('temp-');
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          'flex',
                          own ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[70%] rounded-2xl px-4 py-2',
                            own
                              ? 'bg-teal-500 text-white'
                              : 'bg-white text-slate-800 border border-slate-200 shadow-sm',
                            isTemp && 'opacity-60'
                          )}
                        >
                          <p className='whitespace-pre-wrap break-words text-[15px] leading-relaxed'>
                            {message.content}
                          </p>
                          <div
                            className={cn(
                              'mt-0.5 flex items-center justify-end gap-1',
                              own ? 'text-teal-200' : 'text-slate-400'
                            )}
                          >
                            <span className='text-[10px]'>
                              {formatTime(message.createdAt)}
                            </span>
                            {own &&
                              (isTemp ? (
                                <Loader2 className='h-3 w-3 animate-spin' />
                              ) : message.isRead ? (
                                <CheckCheck className='h-3 w-3' />
                              ) : (
                                <Check className='h-3 w-3' />
                              ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isOtherTyping && (
              <div className='flex justify-start animate-in fade-in-0 slide-in-from-left-2'>
                <div className='bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100'>
                  <div className='flex items-center gap-1'>
                    <span
                      className='h-2 w-2 rounded-full bg-slate-400 animate-bounce'
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className='h-2 w-2 rounded-full bg-slate-400 animate-bounce'
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className='h-2 w-2 rounded-full bg-slate-400 animate-bounce'
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      {conversation.status !== 'CLOSED' ? (
        <div className='border-t border-slate-200 bg-white px-4 py-3'>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              className='shrink-0 p-2 text-slate-400 hover:text-teal-600 rounded-full hover:bg-slate-100 transition-colors'
            >
              <Paperclip className='h-5 w-5' />
            </button>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => handleInputChange(e as any)}
              onKeyDown={handleKeyDown}
              placeholder='Nhập tin nhắn...'
              className='flex-1 h-10 rounded-full border border-slate-300 bg-slate-50 px-4 text-sm placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20'
            />
            <button
              type='button'
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              className={cn(
                'shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-colors',
                newMessage.trim()
                  ? 'bg-teal-500 hover:bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              )}
            >
              {sending ? (
                <Loader2 className='h-5 w-5 animate-spin' />
              ) : (
                <Send className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className='border-t border-slate-200 bg-slate-50 px-4 py-3 text-center'>
          <span className='text-sm text-slate-500'>Cuộc hội thoại đã đóng</span>
        </div>
      )}
    </div>
  );
};
