import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { logout } from '@/utils/logout';

async function refreshAccessToken(token: any) {
  try {
    console.log('🔄 Calling refresh token API...');
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/refresh-token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      }
    );

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw refreshedTokens;
    }

    console.log('✅ Token refreshed successfully');
    console.log('New token expires in: 1 minute');

    return {
      ...token,
      accessToken: refreshedTokens.data.accessToken,
      refreshToken: refreshedTokens.data.refreshToken,
      accessTokenExpires: Date.now() + 60 * 1000,
      error: undefined,
    };
  } catch (error) {
    console.error('❌ Error refreshing access token:', error);
    await logout();
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!res.ok) {
          return null;
        }

        const data = await res.json();
        console.log('first login data:', data);

        return {
          id: data.data.user.id,
          email: data.data.user.email,
          name: data.data.user.fullName,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        };
      },
    }),
  ],

  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
  },

  callbacks: {
    async jwt({ token, user, trigger }) {
      // Đăng nhập lần đầu
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 60 * 1000, // 1 phút (60 giây)
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };
      }

      // Token còn hạn
      if (Date.now() < (token.accessTokenExpires as number)) {
        console.log(
          'Token still valid, expires at:',
          new Date(token.accessTokenExpires as number).toLocaleTimeString()
        );
        return token;
      }

      // Token hết hạn, cần refresh
      console.log(
        'Access token expired at:',
        new Date(token.accessTokenExpires as number).toLocaleTimeString()
      );
      console.log('Refreshing token now...');
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user = {
        id: token.user?.id as string,
        email: token.user?.email as string,
        name: token.user?.name as string,
      };

      (session as any).accessToken = token.accessToken;
      (session as any).refreshToken = token.refreshToken;
      (session as any).error = token.error;

      console.log('final session:', session);
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
