import clsx from 'clsx';
import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export type TabsItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ariaLabel,
}: {
  items: TabsItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  ariaLabel?: string;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? '');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeValue = value ?? internalValue;

  const moveFocusAndSelect = (nextItem: TabsItem) => {
    if (nextItem.disabled) return;
    if (value === undefined) {
      setInternalValue(nextItem.value);
    }
    onValueChange?.(nextItem.value);
    tabRefs.current[nextItem.value]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentItem: TabsItem) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const enabledItems = items.filter((item) => !item.disabled);
    const currentIndex = enabledItems.findIndex((item) => item.value === currentItem.value);

    if (currentIndex === -1) return;

    const nextIndex =
      event.key === 'ArrowRight'
        ? (currentIndex + 1) % enabledItems.length
        : event.key === 'ArrowLeft'
          ? (currentIndex - 1 + enabledItems.length) % enabledItems.length
          : event.key === 'Home'
            ? 0
            : enabledItems.length - 1;

    moveFocusAndSelect(enabledItems[nextIndex]);
  };

  return (
    <div className={clsx('flex gap-2 overflow-x-auto pb-1', className)} role="tablist" aria-label={ariaLabel ?? 'Tab list'} aria-orientation="horizontal">
      {items.map((item) => {
        const isActive = item.value === activeValue;

        return (
          <button
            key={item.value}
            ref={(element) => {
              tabRefs.current[item.value] = element;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${item.value}`}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            onKeyDown={(event) => handleKeyDown(event, item)}
            onClick={() => {
              if (item.disabled) return;
              if (value === undefined) {
                setInternalValue(item.value);
              }
              onValueChange?.(item.value);
            }}
            className={clsx(
              'whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary disabled:cursor-not-allowed disabled:opacity-50',
              isActive
                ? 'border-accent/30 bg-accent/15 text-accent shadow-sm'
                : 'border-border/70 bg-surface-primary/70 text-text-secondary hover:border-accent/20 hover:text-text-primary',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
