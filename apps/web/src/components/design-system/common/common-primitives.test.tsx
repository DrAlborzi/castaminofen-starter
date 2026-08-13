import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Chip } from './chip';
import { Button } from './button';
import { Card } from './card';
import { IconButton } from './icon-button';
import { Tag } from './tag';
import { Field } from '../forms/field';
import { Input } from '../forms/input';
import { Textarea } from '../forms/textarea';
import { Select } from '../forms/select';
import { Checkbox } from '../forms/checkbox';
import { RadioGroup } from '../forms/radio-group';
import { Switch } from '../forms/switch';
import { Badge } from './badge';
import { ErrorState } from '../states/error-state';
import { Tabs } from '../navigation/tabs';
import { Dialog } from '../overlays/dialog';

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
        <Input />
      </Field>,
    );

    expect(html).toContain('for="email"');
    expect(html).toContain('id="email"');
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

  it('renders shared form primitives with accessible defaults', () => {
    const html = renderToStaticMarkup(
      <div>
        <Textarea aria-label="Summary" defaultValue="hello" />
        <Select aria-label="Status" defaultValue="draft">
          <option value="draft">Draft</option>
        </Select>
        <Checkbox aria-label="Join list" defaultChecked />
        <RadioGroup aria-label="Priority" value="high" options={[{ value: 'high', label: 'High' }]} />
        <Switch aria-label="Enable notifications" defaultChecked />
        <Badge variant="success">Ready</Badge>
      </div>,
    );

    expect(html).toContain('textarea');
    expect(html).toContain('select');
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('role="radiogroup"');
    expect(html).toContain('role="switch"');
    expect(html).toContain('Ready');
  });

  it('supports arrow-key navigation between tabs', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(
        <Tabs
          items={[
            { value: 'first', label: 'First' },
            { value: 'second', label: 'Second' },
          ]}
          defaultValue="first"
        />,
      );
    });

    const tabs = Array.from(container.querySelectorAll('[role="tab"]')) as HTMLButtonElement[];
    tabs[0].focus();
    act(() => {
      tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    });

    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(tabs[1]);

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it('restores focus to the trigger when a dialog closes and closes on backdrop click', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    function Wrapper() {
      const [open, setOpen] = useState(true);

      return (
        <>
          <button type="button">Trigger</button>
          <Dialog open={open} onOpenChange={setOpen} title="Profile">
            Content
          </Dialog>
        </>
      );
    }

    act(() => {
      root.render(<Wrapper />);
    });

    const trigger = container.querySelector('button') as HTMLButtonElement;
    trigger.focus();

    act(() => {
      const backdrop = container.querySelector('[role="presentation"]') as HTMLDivElement;
      backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.querySelector('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(trigger);

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
