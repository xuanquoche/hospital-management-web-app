import { useCallback, useEffect, useRef, useState } from 'react';

import { clientFetcher } from '@/lib/fetcher';
import {
  Conversation,
  ConversationListResponse,
  ConversationStatus,
  CreateConversationPayload,
  Message,
  MessageListResponse,
  SendMessagePayload,
  SingleConversationResponse,
  SingleMessageResponse,
  UnreadCountResponse,
  UpdateConversationPayload,
} from '@/types/conversation';

interface UseConversationsOptions {
  status?: ConversationStatus;
  autoFetch?: boolean;
}

export const usePatientConversations = (
  options: UseConversationsOptions = {}
) => {
  const { status, autoFetch = true } = options;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (status) params.append('status', status);

      const response: ConversationListResponse = await clientFetcher.get(
        `/patients/conversations${params.toString() ? `?${params.toString()}` : ''}`
      );
      if (response.success) {
        setConversations(response.data);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [status]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response: UnreadCountResponse = await clientFetcher.get(
        '/patients/conversations/unread-count'
      );
      if (response.success) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, []);

  const createConversation = async (payload: CreateConversationPayload) => {
    const response: SingleConversationResponse = await clientFetcher.post(
      '/patients/conversations',
      payload
    );
    if (response.success) {
      setConversations((prev) => [response.data, ...prev]);
      return response.data;
    }
    throw new Error(response.message);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchConversations();
      fetchUnreadCount();
    }
  }, [autoFetch, fetchConversations, fetchUnreadCount]);

  return {
    conversations,
    loading,
    error,
    unreadCount,
    refetch: fetchConversations,
    createConversation,
    fetchUnreadCount,
  };
};

export const useAdminConversations = (
  options: UseConversationsOptions = {}
) => {
  const { status, autoFetch = true } = options;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (status) params.append('status', status);

      const response: ConversationListResponse = await clientFetcher.get(
        `/admin/conversations${params.toString() ? `?${params.toString()}` : ''}`
      );
      if (response.success) {
        setConversations(response.data);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [status]);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response: UnreadCountResponse = await clientFetcher.get(
        '/admin/conversations/unread-count'
      );
      if (response.success) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, []);

  const updateConversation = async (
    id: string,
    payload: UpdateConversationPayload
  ) => {
    const response: SingleConversationResponse = await clientFetcher.patch(
      `/admin/conversations/${id}`,
      payload
    );
    if (response.success) {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? response.data : c))
      );
      return response.data;
    }
    throw new Error(response.message);
  };

  const closeConversation = async (id: string) => {
    const response: SingleConversationResponse = await clientFetcher.patch(
      `/admin/conversations/${id}/close`,
      {}
    );
    if (response.success) {
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? response.data : c))
      );
      return response.data;
    }
    throw new Error(response.message);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchConversations();
      fetchUnreadCount();
    }
  }, [autoFetch, fetchConversations, fetchUnreadCount]);

  return {
    conversations,
    loading,
    error,
    unreadCount,
    refetch: fetchConversations,
    updateConversation,
    closeConversation,
    fetchUnreadCount,
  };
};

interface UseMessagesOptions {
  conversationId: string;
  autoFetch?: boolean;
  isAdmin?: boolean;
}

export const useMessages = (options: UseMessagesOptions) => {
  const { conversationId, autoFetch = true, isAdmin = false } = options;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const lastFetchedIdRef = useRef<string | null>(null);

  const baseUrl = isAdmin ? '/admin/conversations' : '/patients/conversations';

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    try {
      setLoading(true);
      const response: MessageListResponse = await clientFetcher.get(
        `${baseUrl}/${conversationId}/messages?limit=100&sortOrder=asc`
      );
      if (response.success) {
        setMessages(response.data.reverse());
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [conversationId, baseUrl]);

  const sendMessage = useCallback(
    async (payload: SendMessagePayload) => {
      const response: SingleMessageResponse = await clientFetcher.post(
        `${baseUrl}/${conversationId}/messages`,
        payload
      );
      if (response.success) {
        setMessages((prev) => [...prev, response.data]);
        return response.data;
      }
      throw new Error(response.message);
    },
    [baseUrl, conversationId]
  );

  const markAsRead = useCallback(async () => {
    if (!conversationId) return;
    try {
      await clientFetcher.patch(`${baseUrl}/${conversationId}/read`, {});
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  }, [baseUrl, conversationId]);

  // Only fetch once per conversation
  useEffect(() => {
    if (
      autoFetch &&
      conversationId &&
      lastFetchedIdRef.current !== conversationId
    ) {
      lastFetchedIdRef.current = conversationId;
      setMessages([]);
      fetchMessages();
      markAsRead();
    }
  }, [autoFetch, conversationId]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    messages,
    loading,
    error,
    refetch: fetchMessages,
    sendMessage,
    markAsRead,
  };
};
