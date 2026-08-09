import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './alert';
import { EmptyState } from './empty-state';
import { OfflineState } from './offline-state';
import { PartialState } from './partial-state';
import { Provenance } from './provenance';
import { SuccessState } from './success-state';
import { Toast } from './toast';
import { UnsupportedState } from './unsupported-state';
import { LoadingState } from './loading-state';

describe('canonical state primitives', () => {
  it('keeps loading geometry and busy semantics explicit', () => {
    const html = renderToStaticMarkup(<LoadingState variant="section" announce={false} />);
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('loading-state--section');
    expect(html).not.toContain('aria-live');
  });

  it('renders an empty heading and accessible action', () => {
    const html = renderToStaticMarkup(<EmptyState title="No episodes" category="no-items" action={<button type="button">Browse</button>} />);
    expect(html).toContain('<h3');
    expect(html).toContain('Browse');
    expect(html).toContain('no-items');
  });

  it('renders error recovery and offline semantics', () => {
    const html = renderToStaticMarkup(<OfflineState action={<button type="button">Retry</button>} />);
    expect(html).toContain('role="alert"');
    expect(html).toContain('Retry');
    expect(html).toContain('offline');
  });

  it('keeps partial and unsupported states honest', () => {
    const html = renderToStaticMarkup(
      <div>
        <PartialState description="Some sections could not be loaded." />
        <UnsupportedState description="This action is not available yet." />
        <Provenance kind="preview" />
      </div>,
    );
    expect(html).toContain('Some sections could not be loaded.');
    expect(html).toContain('This action is not available yet.');
    expect(html).toContain('Preview');
  });

  it('uses persistent alert and ephemeral toast semantics', () => {
    const html = renderToStaticMarkup(
      <div>
        <Alert variant="error">Action failed</Alert>
        <SuccessState title="Saved" />
        <Toast onDismiss={vi.fn()}>Saved successfully</Toast>
      </div>,
    );
    expect(html).toContain('role="alert"');
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-label="بستن پیام"');
  });
});