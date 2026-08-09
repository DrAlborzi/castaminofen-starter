'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/design-system';
import { Tag } from '@/components/design-system/common/tag';
import { mockContentTypes } from '../data/mockCreatorStudioData';
import type { ContentTypeId } from '../types/creator.types';

export function ContentTypeSelector({
  initialType = 'podcast',
  selectedType: controlledSelectedType,
  onSelectType,
}: {
  initialType?: ContentTypeId;
  selectedType?: ContentTypeId;
  onSelectType?: (type: ContentTypeId) => void;
}) {
  const [internalSelectedType, setInternalSelectedType] = useState<ContentTypeId>(initialType);
  const selectedType = controlledSelectedType ?? internalSelectedType;
  const selected = mockContentTypes.find((type) => type.id === selectedType) ?? mockContentTypes[0];

  const handleSelect = (type: ContentTypeId) => {
    if (controlledSelectedType === undefined) {
      setInternalSelectedType(type);
    }
    onSelectType?.(type);
  };

  return (
    <section className="space-y-4 rounded-[1.75rem] border border-border/80 bg-surface-card/85 p-4 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-caption">انتخاب نوع محتوا</p>
          <h3 className="text-heading text-lg">از میان الگوهای سازنده انتخاب کن</h3>
        </div>
        <Tag className="border-accent/20 bg-accent/10 text-accent">مرحله ۱</Tag>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {mockContentTypes.map((type) => {
          const isActive = type.id === selectedType;

          return (
            <button
              key={type.id}
              type="button"
              onClick={() => handleSelect(type.id as ContentTypeId)}
              className={`rounded-[1.25rem] border p-4 text-right transition-all ${isActive ? 'border-accent/40 bg-accent/10 shadow-soft' : 'border-border/70 bg-surface-secondary/60 hover:border-accent/20'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{type.title}</p>
                  <p className="mt-1 text-sm text-text-secondary">{type.description}</p>
                </div>
                {isActive ? <Tag className="border-accent/20 bg-accent/10 text-accent">انتخاب‌شده</Tag> : null}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-[1.5rem] border border-accent/20 bg-gradient-to-br from-accent/10 via-surface-card to-surface-secondary p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              <Sparkles className="h-4 w-4" />
              مسیر پیشنهادی
            </div>
            <h4 className="mt-2 text-sm font-semibold text-text-primary">{selected.title}</h4>
            <p className="mt-1 text-sm text-text-secondary">{selected.audience}</p>
          </div>
          <Button variant="secondary">شروع ساخت</Button>
        </div>
        <p className="mt-3 text-sm text-text-secondary">{selected.format}</p>
        <p className="mt-1 text-sm text-text-secondary">{selected.description}</p>
      </div>
    </section>
  );
}
