'use client';

import { getSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export enum UploadJobStatus {
  PENDING = 'PENDING',
  UPLOADING = 'UPLOADING',
  PROCESSING_BLOCKCHAIN = 'PROCESSING_BLOCKCHAIN',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface UploadProgressData {
  jobId: string;
  status: UploadJobStatus;
  message: string;
  document?: {
    id: string;
    title: string;
    documentType: string;
    documentUrl: string;
  };
  blockchain?: {
    txHash: string;
    dataHash: string;
    blockNumber?: number;
  } | null;
  error?: string;
  timestamp: string;
}

interface UseUploadSocketOptions {
  onProgress?: (data: UploadProgressData) => void;
  onCompleted?: (data: UploadProgressData) => void;
  onFailed?: (data: UploadProgressData) => void;
}

export const useUploadSocket = (options: UseUploadSocketOptions = {}) => {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const connect = useCallback(async () => {
    if (socketRef.current?.connected) return;

    try {
      const session = await getSession();
      const token = (session as any)?.accessToken;

      if (!token) {
        setConnectionError('Chưa đăng nhập');
        return;
      }

      const baseUrl =
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:3001';
      const socketUrl = `${baseUrl}/upload`;

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
        timeout: 20000,
        forceNew: true,
        withCredentials: false,
      });

      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('✅ Upload socket connected:', socket.id);
        setIsConnected(true);
        setConnectionError(null);
      });

      socket.on('disconnect', (reason) => {
        console.log('❌ Upload socket disconnected:', reason);
        setIsConnected(false);
      });

      socket.on('connect_error', (err) => {
        console.error('⚠️ Upload socket error:', err.message);
        setConnectionError(`Lỗi kết nối: ${err.message}`);
      });

      socket.on('connected', (data) => {
        console.log('🔐 Upload socket authenticated:', data);
      });

      socket.on('upload_progress', (data: UploadProgressData) => {
        console.log('📤 Upload progress:', data);
        optionsRef.current.onProgress?.(data);

        if (data.status === UploadJobStatus.COMPLETED) {
          optionsRef.current.onCompleted?.(data);
        } else if (data.status === UploadJobStatus.FAILED) {
          optionsRef.current.onFailed?.(data);
        }
      });
    } catch (error: any) {
      console.error('Upload socket init error:', error);
      setConnectionError(error.message);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  const retry = useCallback(() => {
    disconnect();
    setTimeout(() => connect(), 500);
  }, [connect, disconnect]);

  return {
    isConnected,
    connectionError,
    retry,
    disconnect,
  };
};
