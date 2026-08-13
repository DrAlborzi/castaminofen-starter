import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type RadioOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  description?: ReactNode;
};

export function RadioGroup({
  className,
  value,
  name,
  options,
  onValueChange,
  disabled,
  label,
  ...props
}: {
  value?: string;
  name?: string;
  options: RadioOption[];
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  label?: ReactNode;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'name'>) {
  const groupName = name ?? `radio-group-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={clsx('space-y-3', className)} role="radiogroup" aria-label={typeof label === 'string' ? label : undefined} {...props}>
      {label ? <p className="text-sm font-medium text-text-primary">{label}</p> : null}
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <label key={option.value} className={clsx('flex items-start gap-3 rounded-[1rem] border border-border/70 bg-surface-card/70 px-3 py-2', disabled || option.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer')}>
            <input
              type="radio"
              name={groupName}
              checked={checked}
              value={option.value}
              disabled={disabled || option.disabled}
              onChange={() => onValueChange?.(option.value)}
              className="mt-0.5 h-4 w-4 accent-accent"
            />
            <span className="min-w-0 flex-1 text-sm text-text-primary">
              <span className="block font-medium">{option.label}</span>
              {option.description ? <span className="mt-0.5 block text-xs text-text-secondary">{option.description}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
