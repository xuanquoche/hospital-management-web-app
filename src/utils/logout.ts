import { signOut as nextAuthSignOut } from 'next-auth/react';

export async function logout() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    await nextAuthSignOut({ callbackUrl: '/sign-in' });
  } catch (err) {
    console.error('Error during logout:', err);
    await nextAuthSignOut({ callbackUrl: '/sign-in' });
  }
}
