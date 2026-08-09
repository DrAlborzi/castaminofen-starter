import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BottomNavigation } from './bottom-navigation';

function TestIcon({ className, 'aria-hidden': ariaHidden }: { className?: string; 'aria-hidden'?: boolean }) {
  return <svg className={className} aria-hidden={ariaHidden} />;
}

describe('BottomNavigation', () => {
  it('keeps the primary action named and focusable', () => {
    const html = renderToStaticMarkup(
      <BottomNavigation items={[{ id: 'create', label: 'Create', href: '/create', icon: TestIcon, primary: true }]} />,
    );

    expect(html).toContain('href="/create"');
    expect(html).toContain('focus-visible:ring-2');
    expect(html).toContain('<span class="sr-only">Create</span>');
  });
});