import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${baseURL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

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

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🔐 [AUTH] Starting login...');
        console.log('🔐 [AUTH] Backend URL:', baseURL);

        if (!credentials) {
          console.log('❌ [AUTH] No credentials provided');
          return null;
        }

        try {
          console.log('🔐 [AUTH] Calling:', `${baseURL}/auth/login`);
          const res = await fetch(`${baseURL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          console.log('🔐 [AUTH] Response status:', res.status);

          if (!res.ok) {
            const errorText = await res.text();
            console.log('❌ [AUTH] Login failed:', errorText);
            return null;
          }

          const data = await res.json();
          console.log('✅ [AUTH] Login success, user:', data.data?.user?.email);

          const { user, accessToken, refreshToken } = data.data;
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role,
            accessToken,
            refreshToken,
          };
        } catch (error) {
          console.error('❌ [AUTH] Exception:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      console.log('🔑 [JWT] Callback called');
      console.log('🔑 [JWT] User exists:', !!user);

      try {
        if (user) {
          console.log('🔑 [JWT] Creating new token for user:', user.email);
          const newToken = {
            ...token,
            accessToken: (user as any).accessToken,
            refreshToken: (user as any).refreshToken,
            accessTokenExpires: Date.now() + 60 * 60 * 1000 * 24,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: (user as any).role,
            },
          };
          console.log('✅ [JWT] Token created successfully');
          return newToken;
        }

        if (Date.now() < (token.accessTokenExpires as number)) {
          return token;
        }

        console.log('🔄 [JWT] Token expired, refreshing...');
        return refreshAccessToken(token);
      } catch (error) {
        console.error('❌ [JWT] Error:', error);
        throw error;
      }
    },

    async session({ session, token }) {
      console.log('📦 [SESSION] Callback called');
      try {
        session.user = {
          id: token.user?.id as string,
          email: token.user?.email as string,
          name: token.user?.name as string,
          role: token.user?.role as string,
        } as any;
        (session as any).accessToken = token.accessToken;
        (session as any).refreshToken = token.refreshToken;
        (session as any).error = token.error;
        console.log('✅ [SESSION] Created:', session.user?.email);
        return session;
      } catch (error) {
        console.error('❌ [SESSION] Error:', error);
        throw error;
      }
    },
  },
  secret: process.env.AUTH_SECRET,
});
