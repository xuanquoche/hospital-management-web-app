'use client';

import { getSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { Message } from '@/types/conversation';

interface UseChatSocketOptions {
  conversationId?: string;
  onNewMessage?: (message: Message) => void;
  onTyping?: (data: { userId: string; userRole: string; isTyping: boolean }) => void;
  onMessagesRead?: (data: { conversationId: string; readBy: string }) => void;
  onConversationUpdate?: () => void;
}

export const useChatSocket = (options: UseChatSocketOptions = {}) => {
  const { conversationId } = options;
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [isConnected, setIsConnected] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const retryCountRef = useRef(0);

  const connect = useCallback(async () => {
    if (socketRef.current?.connected) return;

    try {
      const session = await getSession();
      const token = (session as any)?.accessToken;

      if (!token) {
        setConnectionError('Chưa đăng nhập');
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:3001';
      const socketUrl = `${baseUrl}/chat`;

      console.log('🔌 Connecting to socket:', socketUrl);

      // Disconnect existing socket if any
      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      const socket = io(socketUrl, {
        auth: { token },
        transports: ['polling', 'websocket'],
        upgrade: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 10000,
        timeout: 20000,
        forceNew: true,
        withCredentials: false,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('✅ Socket connected:', socket.id);
        setIsConnected(true);
        setConnectionError(null);
        retryCountRef.current = 0;
      });

      socket.on('disconnect', (reason) => {
        console.log('❌ Socket disconnected:', reason);
        setIsConnected(false);
        setIsJoined(false);
      });

      socket.on('connect_error', (err) => {
        console.error('⚠️ Socket error:', err.message);
        setConnectionError(`Lỗi kết nối: ${err.message}`);
        retryCountRef.current++;
      });

      socket.on('connected', (data) => {
        console.log('🔐 Authenticated:', data);
      });

      socket.on('new_message', (data: { conversationId: string; message: Message }) => {
        const { onNewMessage, conversationId: currentConvId } = optionsRef.current;
        console.log('📩 New message:', data.conversationId);
        if (data.conversationId === currentConvId && onNewMessage) {
          onNewMessage(data.message);
        }
      });

      socket.on('user_typing', (data) => {
        const { onTyping, conversationId: currentConvId } = optionsRef.current;
        if (data.conversationId === currentConvId && onTyping) {
          onTyping(data);
        }
      });

      socket.on('messages_read', (data) => {
        const { onMessagesRead, conversationId: currentConvId } = optionsRef.current;
        if (data.conversationId === currentConvId && onMessagesRead) {
          onMessagesRead(data);
        }
      });

      socket.on('conversation_list_update', () => {
        optionsRef.current.onConversationUpdate?.();
      });

      socket.on('conversation_update', () => {
        optionsRef.current.onConversationUpdate?.();
      });
    } catch (error: any) {
      console.error('Socket init error:', error);
      setConnectionError(error.message);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setIsJoined(false);
    }
  }, []);

  const joinConversation = useCallback((convId: string) => {
    const socket = socketRef.current;
    if (socket?.connected) {
      socket.emit('join_conversation', { conversationId: convId }, (response: any) => {
        if (response?.success) {
          setIsJoined(true);
          console.log('🚪 Joined room:', convId);
        }
      });
    }
  }, []);

  const leaveConversation = useCallback((convId: string) => {
    const socket = socketRef.current;
    if (socket?.connected) {
      socket.emit('leave_conversation', { conversationId: convId });
      setIsJoined(false);
    }
  }, []);

  // Initialize socket on mount
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  // Join conversation when connected
  useEffect(() => {
    if (isConnected && conversationId) {
      joinConversation(conversationId);
      return () => leaveConversation(conversationId);
    }
  }, [isConnected, conversationId, joinConversation, leaveConversation]);

  const sendMessage = useCallback(
    (content: string, messageType: string = 'TEXT'): Promise<Message> => {
      return new Promise((resolve, reject) => {
        const socket = socketRef.current;
        if (!socket?.connected || !conversationId) {
          reject(new Error('Không có kết nối'));
          return;
        }

        socket.emit('send_message', { conversationId, content, messageType }, (response: any) => {
          if (response?.success) {
            resolve(response.message);
          } else {
            reject(new Error(response?.error || 'Gửi tin nhắn thất bại'));
          }
        });
      });
    },
    [conversationId]
  );

  const sendTyping = useCallback(
    (isTyping: boolean) => {
      const socket = socketRef.current;
      if (socket?.connected && conversationId) {
        socket.emit('typing', { conversationId, isTyping });
      }
    },
    [conversationId]
  );

  const markAsRead = useCallback(() => {
    const socket = socketRef.current;
    if (socket?.connected && conversationId) {
      socket.emit('mark_read', { conversationId });
    }
  }, [conversationId]);

  const retry = useCallback(() => {
    disconnect();
    setTimeout(() => connect(), 500);
  }, [connect, disconnect]);

  return {
    isConnected,
    isJoined,
    connectionError,
    sendMessage,
    sendTyping,
    markAsRead,
    joinConversation,
    leaveConversation,
    retry,
  };
};
