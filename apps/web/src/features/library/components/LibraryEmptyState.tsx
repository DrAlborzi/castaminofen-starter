'use client';

import type { LucideIcon } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { Button, EmptyState } from '@/components/design-system';
import Link from 'next/link';

export function LibraryEmptyState({
  title,
  description,
  actionLabel = 'شروع کشف',
  eyebrow,
  supportingText,
  icon: Icon = Sparkles,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  eyebrow?: string;
  supportingText?: string;
  icon?: LucideIcon;
}) {
  return (
    <EmptyState
      className="border border-border/80 bg-surface-primary/90 p-6 shadow-soft sm:p-8"
      title={title}
      description={description}
      eyebrow={eyebrow}
      supportingText={supportingText}
      icon={Icon}
      action={
        <Link href="/podcasts" className="inline-flex">
          <Button variant="primary" size="sm">
            {actionLabel}
          </Button>
        </Link>
      }
    />
  );
}
