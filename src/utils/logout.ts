import { signOut as nextAuthSignOut } from 'next-auth/react';

export async function logout() {
  try {
    // 1. Gọi API Logout Backend (để hủy token phía server nếu cần)
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // Log lỗi nhưng vẫn tiếp tục quy trình logout client
    console.error('Error during backend logout:', err);
  } finally {
    // 2. Xóa session của NextAuth
    // Quan trọng: redirect: false để tránh NextAuth tự điều hướng gây lỗi 404
    await nextAuthSignOut({ redirect: false });

    // 3. Hard redirect về trang chủ
    // Middleware sẽ tự phát hiện chưa login và đá về /sign-in đúng locale
    window.location.href = '/';
  }
}
