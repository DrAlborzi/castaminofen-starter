import clsx from 'clsx';
import { AlertCircle, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ErrorStateKind } from './state-types';

export function ErrorState({
	message = 'مشکلی پیش آمده است.',
	className,
	title,
	description,
	action,
	kind = 'generic',
	icon: Icon = AlertCircle,
}: {
	message?: string;
	className?: string;
	title?: string;
	description?: string;
	action?: ReactNode;
	kind?: ErrorStateKind;
	icon?: LucideIcon;
}) {
	return (
		<div className={clsx('error-state', `error-state--${kind}`, className)} role="alert" aria-live="assertive">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start">
				<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-error/10 text-error">
					<Icon className="h-5 w-5" aria-hidden="true" />
				</div>
				<div className="space-y-3">
					{title ? <h3 className="m-0 text-subheading">{title}</h3> : null}
					<p className="m-0 text-sm font-medium">{message}</p>
					{description ? <p className="m-0 text-sm text-text-secondary">{description}</p> : null}
					{action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
				</div>
			</div>
		</div>
	);
}