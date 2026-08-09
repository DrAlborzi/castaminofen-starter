import { WifiOff } from 'lucide-react';
import type { ReactNode } from 'react';
import { ErrorState } from './error-state';

export function OfflineState({
  title = 'اتصال اینترنت برقرار نیست',
  description = 'اتصال خود را بررسی کنید و دوباره تلاش کنید.',
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return <ErrorState kind="offline" title={title} description={description} action={action} className={className} icon={WifiOff} />;
}