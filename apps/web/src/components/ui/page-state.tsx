import clsx from 'clsx';
import type { ReactNode } from 'react';
import { EmptyState, ErrorState, LoadingState, OfflineState, PartialState, UnsupportedState } from '@/components/design-system';

export type PageStateVariant = 'loading' | 'empty' | 'partial' | 'error' | 'offline' | 'unsupported';

export function PageState({
  variant,
  title,
  description,
  action,
  className,
  message,
}: {
  variant: PageStateVariant;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  message?: string;
}) {
  if (variant === 'loading') {
    return <LoadingState className={className} title={title} message={description} />;
  }

  if (variant === 'error') {
    return (
      <ErrorState
        className={className}
        title={title}
        description={description}
        action={action}
        message={message ?? 'مشکلی در نمایش این بخش پیش آمده است.'}
      />
    );
  }

  if (variant === 'partial') {
    return <PartialState className={className} title={title} description={description ?? 'بخشی از این بخش در دسترس نیست.'} action={action} />;
  }

  if (variant === 'offline') {
    return <OfflineState className={className} title={title} description={description} action={action} />;
  }

  if (variant === 'unsupported') {
    return <UnsupportedState className={className} title={title} description={description ?? 'این قابلیت هنوز پشتیبانی نمی‌شود.'} action={action} />;
  }

  return <EmptyState className={clsx('w-full', className)} title={title} description={description} action={action} />;
}
