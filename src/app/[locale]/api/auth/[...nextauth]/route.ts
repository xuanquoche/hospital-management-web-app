import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/refresh-token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      }
    );

    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.data.accessToken,
      refreshToken: refreshedTokens.data.refreshToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000 * 24,
      error: undefined,
    };
  } catch (error) {
    console.error('❌ Error refreshing access token:', error);
    return { ...token, error: 'RefreshAccessTokenError' };
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

        if (!res.ok) return null;

        const data = await res.json();
        const { user, accessToken, refreshToken } = data.data;

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 60 * 60 * 1000 * 24,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

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

// ✅ Phải export như thế này (NextAuth v5+)
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
