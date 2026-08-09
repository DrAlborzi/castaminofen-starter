import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Chip } from './chip';
import { Button } from './button';
import { Card } from './card';
import { IconButton } from './icon-button';
import { Tag } from './tag';
import { Field } from '../forms/field';
import { Input } from '../forms/input';
import { ErrorState } from '../states/error-state';

describe('design system common primitives', () => {
  it('renders chip and tag content with the shared surface styling', () => {
    const html = renderToStaticMarkup(
      <div>
        <Chip>Trending</Chip>
        <Tag>New</Tag>
      </div>,
    );

    expect(html).toContain('Trending');
    expect(html).toContain('New');
  });

  it('renders icon buttons with accessible labels', () => {
    const html = renderToStaticMarkup(
      <IconButton label="Open actions" aria-label="Open actions">
        <span aria-hidden="true">+</span>
      </IconButton>,
    );

    expect(html).toContain('aria-label="Open actions"');
  });

  it('keeps native button semantics for destructive and loading states', () => {
    const html = renderToStaticMarkup(
      <Button variant="destructive" loading>
        Delete
      </Button>,
    );

    expect(html).toContain('disabled');
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('button-destructive');
  });

  it('associates field guidance and errors with its control', () => {
    const html = renderToStaticMarkup(
      <Field id="email" label="Email" description="Use your account email" error="Required">
        <Input id="email" />
      </Field>,
    );

    expect(html).toContain('for="email"');
    expect(html).toContain('aria-describedby="email-description email-error"');
    expect(html).toContain('aria-invalid="true"');
  });

  it('exposes semantic surface and error state primitives', () => {
    const html = renderToStaticMarkup(
      <div>
        <Card variant="selected">Selected</Card>
        <ErrorState title="Could not load" action={<Button>Retry</Button>} />
      </div>,
    );

    expect(html).toContain('surface-selected');
    expect(html).toContain('role="alert"');
    expect(html).toContain('Retry');
  });
});
