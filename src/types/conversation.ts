export type ConversationStatus =
  | 'OPEN'
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'CLOSED';
export type ConversationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
export type MessageType = 'TEXT' | 'IMAGE' | 'FILE';
export type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT';

export interface ConversationPatient {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface ConversationLastMessage {
  id: string;
  content: string;
  senderRole: UserRole;
  messageType: MessageType;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  subject: string | null;
  status: ConversationStatus;
  priority: ConversationPriority;
  assignedAdminId: string | null;
  lastMessageAt: string | null;
  closedAt: string | null;
  createdAt: string;
  patient: ConversationPatient;
  lastMessage: ConversationLastMessage | null;
  messageCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: UserRole;
  content: string;
  messageType: MessageType;
  attachmentUrl: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface ConversationListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Conversation[];
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
}

export interface MessageListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Message[];
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
}

export interface SingleConversationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Conversation;
  timestamp: string;
}

export interface SingleMessageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Message;
  timestamp: string;
}

export interface UnreadCountResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    unreadCount: number;
  };
  timestamp: string;
}

export interface CreateConversationPayload {
  subject?: string;
  initialMessage?: string;
}

export interface SendMessagePayload {
  content: string;
  messageType?: MessageType;
  attachmentUrl?: string;
}

export interface UpdateConversationPayload {
  subject?: string;
  status?: ConversationStatus;
  priority?: ConversationPriority;
  assignedAdminId?: string;
}
