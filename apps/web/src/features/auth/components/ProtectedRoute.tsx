'use client';

import { useSession } from '@/lib/auth';
import { LoadingState } from '@/components/design-system';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError } = useSession();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hasResolvedSession = Boolean(data) || isAuthenticated;

  useEffect(() => {
    if (!isLoading && isHydrated && !hasResolvedSession && !isError) {
      router.replace('/login');
    }
  }, [hasResolvedSession, isError, isHydrated, isLoading, router]);

  if (isLoading || !isHydrated) {
    return <LoadingState title="احراز هویت" message="در حال بررسی نشست شما..." />;
  }

  if (!hasResolvedSession) {
    return <LoadingState title="ورود به حساب" message="در حال انتقال به صفحه ورود..." />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
