'use client';

import { getSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface PaymentSuccessData {
  paymentId: string;
  paymentCode: string;
  amount: number;
  appointmentId: string;
  message: string;
  timestamp: string;
}

interface UsePaymentSocketOptions {
  onPaymentSuccess?: (data: PaymentSuccessData) => void;
}

export const usePaymentSocket = (options: UsePaymentSocketOptions = {}) => {
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
      const socketUrl = `${baseUrl}/payment`;

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
        console.log('✅ Payment socket connected:', socket.id);
        setIsConnected(true);
        setConnectionError(null);
      });

      socket.on('disconnect', (reason) => {
        console.log('❌ Payment socket disconnected:', reason);
        setIsConnected(false);
      });

      socket.on('connect_error', (err) => {
        console.error('⚠️ Payment socket error:', err.message);
        setConnectionError(`Lỗi kết nối: ${err.message}`);
      });

      socket.on('connected', (data) => {
        console.log('🔐 Payment socket authenticated:', data);
      });

      socket.on('payment_success', (data: PaymentSuccessData) => {
        console.log('💰 Payment success:', data);
        optionsRef.current.onPaymentSuccess?.(data);
      });
    } catch (error: any) {
      console.error('Payment socket init error:', error);
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
