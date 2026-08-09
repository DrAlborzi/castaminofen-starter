import clsx from 'clsx';

export type ProvenanceKind = 'preview' | 'coming-soon' | 'unavailable' | 'unsupported' | 'illustrative';

const labels: Record<ProvenanceKind, string> = {
  preview: 'Preview',
  'coming-soon': 'Coming soon',
  unavailable: 'Unavailable',
  unsupported: 'Not yet supported',
  illustrative: 'Illustrative',
};

export function Provenance({ kind = 'preview', className }: { kind?: ProvenanceKind; className?: string }) {
  return <span className={clsx('inline-flex max-w-full items-center rounded-radius-pill border border-border px-2.5 py-1 text-xs font-medium text-text-secondary', className)}>{labels[kind]}</span>;
}