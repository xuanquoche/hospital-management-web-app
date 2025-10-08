import { getServerSession } from 'next-auth/next';
import { getSession, signOut } from 'next-auth/react';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';

class APIClient {
  private baseURL: string;
  private isClient: boolean;

  constructor(baseURL?: string, isClient: boolean = true) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL || '';
    this.isClient = isClient;
  }

  private async getSession() {
    if (this.isClient) {
      return await getSession();
    } else {
      return await getServerSession(authOptions);
    }
  }

  private async handleRequest(endpoint: string, options: RequestInit = {}) {
    // Public endpoint không cần auth
    if (this.isPublicEndpoint(endpoint)) {
      const headers: Record<string, string> = {
        ...((options.headers as Record<string, string>) || {}),
      };

      if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }

      const res = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          err.message || `API request failed with status ${res.status}`
        );
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      }
      return await res.text();
    }

    // Protected endpoint - cần auth
    const session = await this.getSession();

    // Kiểm tra nếu có lỗi refresh token
    if ((session as any)?.error === 'RefreshAccessTokenError') {
      console.error('Session refresh failed');
      if (this.isClient) {
        await signOut({ callbackUrl: '/sign-in' });
      }
      throw new Error('Authentication failed, please login again');
    }

    if (!session) {
      throw new Error('Unauthorized - No session found');
    }

    const accessToken = (session as any)?.accessToken;
    console.log(
      'Making request with token:',
      accessToken ? 'Token exists' : 'No token'
    );

    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    // Chỉ thêm Content-Type nếu không phải FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Thêm Authorization header
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    // Nếu vẫn 401 sau khi NextAuth đã refresh, đăng xuất
    if (res.status === 401) {
      console.error('Unauthorized request - Token may be invalid');
      if (this.isClient) {
        await signOut({ callbackUrl: '/sign-in' });
      }
      throw new Error('Unauthorized, please login again');
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        err.message || `API request failed with status ${res.status}`
      );
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    }
    return await res.text();
  }

  private isPublicEndpoint(endpoint: string): boolean {
    const publicEndpoints = ['/auth/login', '/auth/register', '/auth/refresh'];
    return publicEndpoints.some((publicEndpoint) =>
      endpoint.startsWith(publicEndpoint)
    );
  }

  // Public methods
  async get(endpoint: string, options?: RequestInit) {
    return this.handleRequest(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint: string, data?: any, options?: RequestInit) {
    return this.handleRequest(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(endpoint: string, data?: any, options?: RequestInit) {
    return this.handleRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch(endpoint: string, data?: any, options?: RequestInit) {
    return this.handleRequest(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(endpoint: string, options?: RequestInit) {
    return this.handleRequest(endpoint, { ...options, method: 'DELETE' });
  }

  async postFormData(
    endpoint: string,
    formData: FormData,
    options?: RequestInit
  ) {
    return this.handleRequest(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        ...options?.headers,
        // Không set Content-Type, để browser tự set với boundary
      },
    });
  }
}

// Export instances
export const clientFetcher = new APIClient(undefined, true);
export const serverFetcher = new APIClient(undefined, false);
export default APIClient;
