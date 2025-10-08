// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    id: string;
    email: string;
    name: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
    accessToken?: string;
    refreshToken?: string;
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: string;
      email: string;
      name: string;
    };
    error?: string;
  }
}
